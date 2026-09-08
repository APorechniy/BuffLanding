import { env } from '../config/env';
export class XuiService {
    baseUrl = env.XUI_URL.replace(/\/$/, '');
    get headers() {
        return {
            'Authorization': `Bearer ${env.XUI_TOKEN}`,
            'Content-Type': 'application/json',
        };
    }
    async addClient(params) {
        const totalBytes = (params.totalGbLimit || 100) * 1024 * 1024 * 1024;
        const payload = {
            client: {
                id: params.clientUuid,
                alterId: 0,
                email: params.email,
                limitIp: 2,
                totalGB: totalBytes,
                expiryTime: params.expiryTimeMs,
                enable: true,
                tgId: params.tgId,
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
            if (!res.ok)
                return false;
            const data = await res.json();
            return data.success;
        }
        catch (err) {
            console.error('XUI addClient Error:', err);
            return false;
        }
    }
    async updateClientStatus(params) {
        const payload = {
            id: params.clientUuid,
            alterId: 0,
            email: params.email,
            limitIp: 2,
            totalGB: 100 * 1024 * 1024 * 1024,
            expiryTime: params.expiryTimeMs,
            enable: params.enable,
            tgId: params.tgId,
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
            if (!res.ok)
                return false;
            const data = await res.json();
            return data.success;
        }
        catch (err) {
            console.error('XUI updateClientStatus Error:', err);
            return false;
        }
    }
}
export const xuiService = new XuiService();
