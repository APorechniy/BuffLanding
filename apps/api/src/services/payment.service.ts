import crypto from 'node:crypto';

export interface PaymentInvoice {
    id: string;
    orderId: string;
    paymentUrl: string;
    amount: number;
    rawResponse?: any;
}

export interface PaymentWebhookPayload {
    orderId: string;
    amount: number;
    status: "NEW" | "PROCESSING" | "PAID" | "EXPIRED" | "ERROR" | "REFUNDED"
    rawData: Record<string, any>;
}

// 1. Функция генерации HMAC сигнатуры
export function generateSignature(params: Record<string, any>, secretKey: string): string {
    const sortedKeys = Object.keys(params).sort();
    const values: string[] = [];

    for (const key of sortedKeys) {
        let val = params[key];

        // 1. ВАЖНО: null или undefined должны быть пустой строкой, а не словом "null"
        if (val === null || val === undefined) {
            val = '';
        } else if (typeof val === 'number') {
            if (Number.isInteger(val)) {
                val = val.toString();
            } else {
                val = (Math.round(val * 100) / 100).toFixed(2).replace(/\.?0+$/, '');
            }
        }

        values.push(String(val));
    }

    const concatenatedString = values.join('');

    return crypto
        .createHmac('sha256', secretKey)
        .update(concatenatedString, 'utf8')
        .digest('hex');
}

export class PaymentService {
    private baseUrl: string;
    private shopId: string;
    private apiKey: string;
    private callbackKey: string;

    constructor() {
        this.baseUrl = (process.env.PAYMENT_URL || '').replace(/\/+$/, '');
        this.shopId = process.env.PAYMENT_SHOP_ID || '';
        this.apiKey = process.env.PAYMENT_API_KEY || '';
        this.callbackKey = process.env.PAYMENT_CALLBACK_KEY || '';
    }

    /**
     * Создание инвойса в шлюзе
     */
    async createInvoice(orderId: string, amount: number, hookUrl: string): Promise<PaymentInvoice> {
        const url = `${this.baseUrl}/invoice/create`;

        const payload: Record<string, any> = {
            shop_id: this.shopId,
            amount: amount,
            order_id: orderId,
            comment: `Оплата Buff VPN (Заказ #${orderId})`,
            callback_url: hookUrl,
        };

        const signature = generateSignature(payload, this.apiKey);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-SIGNATURE': signature,
            },
            body: JSON.stringify(payload),
        });

        const responseText = await response.text();
        let data: any;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`Ошибка парсинга ответа платежки (${response.status}): ${responseText}`);
        }

        if (!response.ok) {
            throw new Error(`Ошибка платежного шлюза: ${data?.message || responseText}`);
        }

        const paymentUrl = data.link;
        if (!paymentUrl) {
            throw new Error("Ответ API не содержит ссылки на оплату (поле 'link' отсутствует)");
        }

        return {
            id: data.id,
            orderId: orderId,
            paymentUrl: paymentUrl,
            amount: amount,
            rawResponse: data,
        };
    }

    /**
     * Ручная проверка статуса
     */
    async checkInvoiceStatus(orderId: string): Promise<string> {
        const url = `${this.baseUrl}/invoice/status`;
        const payload = {
            shop_id: this.shopId,
            order_id: orderId,
        };

        const signature = generateSignature(payload, this.apiKey);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-SIGNATURE': signature,
            },
            body: JSON.stringify(payload),
        });

        const data: any = await response.json();
        if (!data.status) {
            throw new Error("Ответ API не содержит поля 'status'");
        }

        return String(data.status).toUpperCase();
    }

    /**
     * Проверка входящей подписи от платежки
     */
    verifyWebhookSignature(rawBody: string | Buffer, signatureHeader?: string): boolean {
        if (!signatureHeader) return false;

        try {
            const data = typeof rawBody === 'string' ? JSON.parse(rawBody) : JSON.parse(rawBody.toString('utf-8'));
            const payloadToSign: Record<string, any> = {};

            for (const [k, v] of Object.entries(data)) {
                if (k !== 'sign') {
                    payloadToSign[k] = v;
                }
            }

            const computed = generateSignature(payloadToSign, this.callbackKey);

            const sigBuf = Buffer.from(signatureHeader.toLowerCase(), 'utf8');
            const compBuf = Buffer.from(computed.toLowerCase(), 'utf8');

            if (sigBuf.length !== compBuf.length) return false;
            return crypto.timingSafeEqual(sigBuf, compBuf);
        } catch {
            return false;
        }
    }

    /**
     * Парсер тела вебхука
     */
    parseWebhook(data: Record<string, any>): PaymentWebhookPayload {
        const orderId = String(data.order_id);
        const amount = Number(data.amount || 0);
        const rawStatus = String(data.status || '').toLowerCase();

        const normalizedStatus: PaymentWebhookPayload["status"] = ["NEW", "PROCESSING", "PAID", "EXPIRED", "ERROR", "REFUNDED"].includes(rawStatus)
            ? rawStatus as PaymentWebhookPayload["status"]
            : "ERROR";

        return {
            orderId,
            amount,
            status: normalizedStatus,
            rawData: data,
        };
    }
}

export const paymentService = new PaymentService();