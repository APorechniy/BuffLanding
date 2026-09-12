import { PrismaClient } from '@prisma/client';
import crypto from 'node:crypto';
import { env } from '../config/env.js';
import { xuiService } from './xui.service.js';
import { emailService } from './email.service.js';

interface TrialResult {
    success: boolean;
    status: 'NEW_TRIAL' | 'ACTIVE_SUBSCRIPTION' | 'TRIAL_EXPIRED';
    message: string;
    subUrl?: string;
    expiresAt?: Date;
}

const prisma = new PrismaClient();

export class VpnService {
    async grantVpnAccess(email: string, days: number, minutes: number, totalGb = 100): Promise<string> {
        let user = await prisma.user.findUnique({ where: { email } });

        const userId = user?.userId || crypto.randomUUID();
        const subId = user?.subId || crypto.randomBytes(8).toString('hex');

        const now = new Date();
        const baseTime = (user?.expiresAt && user.expiresAt > now) ? user.expiresAt : now;
        const expiresAt = new Date(baseTime.getTime() + days * 24 * minutes * 60 * 1000);
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

    async getSubscriptionUrl(email: string): Promise<string> {
        const cleanEmail = email.trim().toLowerCase();
        const user = await prisma.user.findUnique({ where: { email: cleanEmail } });

        if (!user) {
            throw new Error("Пользователь не найден")
        }

        return `${env.XUI_SUB_BASE_URL.replace(/\/$/, '')}/buff-subscribe/${user.subId}`;
    }

    async activateTrial(email: string): Promise<TrialResult> {
        const cleanEmail = email.trim().toLowerCase();
        const user = await prisma.user.findUnique({ where: { email: cleanEmail } });

        const now = new Date();

        // Случай 2: Пользователь с еще ДЕЙСТВУЮЩИМ доступом
        if (user && user.expiresAt && user.expiresAt > now) {
            return {
                success: false,
                status: 'ACTIVE_SUBSCRIPTION',
                message: 'У вас уже есть активная подписка. Ссылка доступа ранее была отправлена на вашу почту.',
                expiresAt: user.expiresAt,
            };
        }

        // Случай 3: Пользователь уже брал триал, и срок действия истек
        if (user?.trialUsed) {
            return {
                success: false,
                status: 'TRIAL_EXPIRED',
                message: 'Пробный период для этого Email уже был использован. Выберите подходящий тариф для продления.',
            };
        }

        // Случай 1: Новый пользователь (или пользователь без триала) -> Выдаем доступ
        const subUrl = await this.grantVpnAccess(cleanEmail, 1, 10);

        const oneDayLater = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Создаем или обновляем пользователя
        await prisma.user.upsert({
            where: { email: cleanEmail },
            create: {
                userId: String(Date.now()),
                email: cleanEmail,
                subId: Math.random().toString(36).substring(2, 10),
                status: 'active',
                trialUsed: true,
                expiresAt: oneDayLater,
            },
            update: {
                trialUsed: true,
                status: 'active',
                expiresAt: oneDayLater,
            },
        });

        // Отправляем письмо с ключом
        await emailService.sendSubscribe({
            clientEmail: cleanEmail,
            sublink: subUrl,
            mode: 'TRIAL',
        });

        return {
            success: true,
            status: 'NEW_TRIAL',
            message: 'Пробный период на 1 день успешно активирован!',
            subUrl,
        };
    }
}

export const vpnService = new VpnService();