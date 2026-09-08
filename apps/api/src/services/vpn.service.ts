import { PrismaClient } from '@prisma/client';
import crypto from 'node:crypto';
import { env } from '../config/env.js';
import { xuiService } from './xui.service.js';

const prisma = new PrismaClient();

export class VpnService {
    async grantVpnAccess(userId: bigint, days: number, totalGb = 100): Promise<string> {
        let user = await prisma.user.findUnique({ where: { userId } });

        const clientUuid = user?.clientUuid || crypto.randomUUID();
        const subId = user?.subId || crypto.randomBytes(8).toString('hex');
        const email = `tg_${userId}`;

        const now = new Date();
        const baseTime = (user?.expiresAt && user.expiresAt > now) ? user.expiresAt : now;
        const expiresAt = new Date(baseTime.getTime() + days * 24 * 60 * 60 * 1000);
        const expiryMs = expiresAt.getTime();

        // 1. Добавляем или обновляем в 3X-UI
        let success = await xuiService.addClient({
            email,
            clientUuid,
            subId,
            tgId: Number(userId),
            expiryTimeMs: expiryMs,
            totalGbLimit: totalGb,
        });

        if (!success) {
            success = await xuiService.updateClientStatus({
                email,
                clientUuid,
                subId,
                tgId: Number(userId),
                enable: true,
                expiryTimeMs: expiryMs,
            });
            if (!success) throw new Error('Failed to synchronize with 3X-UI panel');
        }

        // 2. Обновляем локальную БД
        await prisma.user.upsert({
            where: { userId },
            update: { clientUuid, subId, status: 'active', expiresAt },
            create: { userId, clientUuid, subId, status: 'active', expiresAt },
        });

        return `${env.XUI_SUB_BASE_URL.replace(/\/$/, '')}/buff-subscribe/${subId}`;
    }

    async activateTrial(userId: bigint): Promise<{ success: boolean; subUrl?: string; message?: string }> {
        const user = await prisma.user.findUnique({ where: { userId } });

        if (user?.trialUsed) {
            return { success: false, message: 'Пробный период уже был использован.' };
        }

        const subUrl = await this.grantVpnAccess(userId, 1, 10);

        await prisma.user.update({
            where: { userId },
            data: { trialUsed: true },
        });

        return { success: true, subUrl };
    }
}

export const vpnService = new VpnService();