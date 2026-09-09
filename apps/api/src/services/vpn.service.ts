import { PrismaClient } from '@prisma/client';
import crypto from 'node:crypto';
import { env } from '../config/env.js';
import { xuiService } from './xui.service.js';
import { emailService } from './email.service.js';

const prisma = new PrismaClient();

export class VpnService {
    async grantVpnAccess(email: string, days: number, totalGb = 100): Promise<string> {
        let user = await prisma.user.findUnique({ where: { email } });

        const userId = user?.userId || crypto.randomUUID();
        const subId = user?.subId || crypto.randomBytes(8).toString('hex');

        const now = new Date();
        const baseTime = (user?.expiresAt && user.expiresAt > now) ? user.expiresAt : now;
        const expiresAt = new Date(baseTime.getTime() + days * 24 * 60 * 60 * 1000);
        const expiryMs = expiresAt.getTime();

        // 1. Добавляем или обновляем в 3X-UI
        let success = await xuiService.addClient({
            userId,
            email,
            subId,
            expiryTimeMs: expiryMs,
            totalGbLimit: totalGb,
        });

        if (!success) {
            success = await xuiService.updateClientStatus({
                userId,
                email,
                subId,
                enable: true,
                expiryTimeMs: expiryMs,
            });
            if (!success) throw new Error('Failed to synchronize with 3X-UI panel');
        }

        // 2. Обновляем локальную БД
        await prisma.user.upsert({
            where: { userId },
            update: { subId, status: 'active', expiresAt },
            create: { userId, email, subId, status: 'active', expiresAt },
        });

        return `${env.XUI_SUB_BASE_URL.replace(/\/$/, '')}/buff-subscribe/${subId}`;
    }

    async activateTrial(email: string): Promise<{ success: boolean; subUrl?: string; message?: string }> {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user?.trialUsed) {
            return { success: false, message: 'Пробный период уже был использован.' };
        }

        const subUrl = await this.grantVpnAccess(email, 1, 10);

        await prisma.user.update({
            where: { email },
            data: { trialUsed: true },
        });

        await emailService.sendSubscribe({
            clientEmail: email,
            sublink: subUrl
        })

        return { success: true, subUrl };
    }
}

export const vpnService = new VpnService();