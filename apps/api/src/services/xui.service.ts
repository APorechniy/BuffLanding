import { env } from '../config/env';

export class XuiService {
    private baseUrl = env.XUI_URL.replace(/\/$/, '');

    private get headers() {
        return {
            'Authorization': `Bearer ${env.XUI_TOKEN}`,
            'Content-Type': 'application/json',
        };
    }

    async addClient(params: {
        userId: string,
        email: string;
        subId: string;
        expiryTimeMs: number;
        totalGbLimit?: number;
    }): Promise<boolean> {
        const totalBytes = (params.totalGbLimit || 100) * 1024 * 1024 * 1024;

        const payload = {
            client: {
                id: params.userId,
                alterId: 0,
                email: params.email,
                limitIp: 2,
                totalGB: totalBytes,
                expiryTime: params.expiryTimeMs,
                enable: true,
                subId: params.subId,
                flow: 'xtls-rprx-vision',
            },
            inboundIds: [...env.XUI_INBOUND_IDS],
        };

        try {
            const res = await fetch(`${this.baseUrl}/panel/api/clients/add`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(payload),
            });

            if (!res.ok) return false;
            const data = await res.json() as { success: boolean };
            return data.success;
        } catch (err) {
            console.error('XUI addClient Error:', err);
            return false;
        }
    }

    async updateClientStatus(params: {
        userId: string;
        email: string;
        subId: string;
        enable: boolean;
        expiryTimeMs: number;
    }): Promise<boolean> {
        const payload = {
            id: params.userId,
            alterId: 0,
            email: params.email,
            limitIp: 2,
            totalGB: 100 * 1024 * 1024 * 1024,
            expiryTime: params.expiryTimeMs,
            enable: params.enable,
            subId: params.subId,
            flow: 'xtls-rprx-vision',
            inboundIds: [...env.XUI_INBOUND_IDS],
        };

        try {
            const res = await fetch(`${this.baseUrl}/panel/api/clients/update/${params.email}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(payload),
            });

            if (!res.ok) return false;
            const data = await res.json() as { success: boolean };
            return data.success;
        } catch (err) {
            console.error('XUI updateClientStatus Error:', err);
            return false;
        }
    }
}

export const xuiService = new XuiService();