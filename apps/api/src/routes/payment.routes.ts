import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { paymentService } from '../services/payment.service';
import { vpnService } from '@/services/vpn.service';
import { emailService } from '../services/email.service';
import { TARIFFS, Tariff } from '@buffvpn/shared';
import { env } from '@/config/env';

const prisma = new PrismaClient();

export async function paymentRoutes(fastify: FastifyInstance) {
    fastify.post('/api/payment/create', async (req: FastifyRequest, reply: FastifyReply) => {
        const { email, tariffId } = req.body as { email: string; tariffId: string };

        const tariff: Tariff | undefined = TARIFFS[tariffId];
        if (!tariff) {
            return reply.status(400).send({ error: 'Тариф не найден' });
        }

        const cleanEmail = email.trim().toLowerCase();
        const orderId = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        try {
            let user = await prisma.user.findUnique({ where: { email: cleanEmail } });
            if (!user) {
                user = await prisma.user.create({
                    data: {
                        userId: String(Date.now()),
                        email: cleanEmail,
                        subId: Math.random().toString(36).substring(2, 10),
                        status: 'pending',
                    },
                });
            }

            await prisma.payment.create({
                data: {
                    orderId,
                    userId: user.userId,
                    amount: tariff.price,
                    tariffId: tariff.id,
                    status: 'pending',
                },
            });

            const callbackUrl = `${env.PAYMENT_WEBHOOK_URL}/api/payment/webhook`;
            const invoice = await paymentService.createInvoice(orderId, tariff.price, callbackUrl);

            return reply.send({
                success: true,
                orderId: invoice.orderId,
                paymentUrl: invoice.paymentUrl,
            });
        } catch (err: any) {
            return reply.status(500).send({ error: err.message });
        }
    });

    // Webhook
    fastify.post('/api/payment/webhook', async (req: FastifyRequest, reply: FastifyReply) => {
        const rawSignature = (req.headers['x-signature'] || req.headers['X-SIGNATURE']) as string;
        const body = req.body as Record<string, any>;

        if (!paymentService.verifyWebhookSignature(JSON.stringify(body), rawSignature)) {
            return reply.status(400).send({ error: 'Invalid signature' });
        }

        const webhookData = paymentService.parseWebhook(body);
        if (webhookData.status === 'success') {
            const payment = await prisma.payment.findUnique({ where: { orderId: webhookData.orderId } });

            if (!payment) {
                throw new Error("[WEBHOOK]: Cannot find payment")
            }

            const user = await prisma.user.findUnique({ where: { userId: payment.userId } })

            if (!user) {
                throw new Error("[WEBHOOK]: Cannot find user")
            }

            if (payment && payment.status !== 'completed') {
                const tariff: Tariff = TARIFFS[payment.tariffId || '30'];

                const subUrl = await vpnService.grantVpnAccess(user.email, tariff.days, tariff.total_gb)

                await emailService.sendSubscribe({
                    clientEmail: user.email,
                    sublink: subUrl,
                    mode: "TARIFF",
                    tariffName: tariff.name,
                    amount: tariff.price
                });
            }
        }

        return reply.send({ status: 'OK' });
    });

    // 3. Polling статуса для фронтенда (проверка прохождения оплаты)
    fastify.get('/api/payment/status/:orderId', async (req: FastifyRequest<{ Params: { orderId: string } }>, reply) => {
        const payment = await prisma.payment.findUnique({
            where: { orderId: req.params.orderId },
        });

        if (!payment) return reply.status(404).send({ error: 'Заказ не найден' });
        return reply.send({ status: payment.status });
    });
}

