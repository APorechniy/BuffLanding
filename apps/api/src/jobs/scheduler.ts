import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { xuiService } from '../services/xui.service.js';

const prisma = new PrismaClient();

export function initScheduler() {
    // Каждые 5 минут
    cron.schedule('*/5 * * * *', async () => {
        console.log('Running background subscription expiration check...');
        const now = new Date();

        const expiredUsers = await prisma.user.findMany({
            where: {
                status: 'active',
                expiresAt: { lte: now },
            },
        });

        for (const user of expiredUsers) {
            if (!user.clientUuid) continue;

            try {
                await prisma.user.update({
                    where: { userId: user.userId },
                    data: { status: 'expired' },
                });

                await xuiService.updateClientStatus({
                    email: `tg_${user.userId}`,
                    clientUuid: user.clientUuid,
                    subId: user.subId,
                    tgId: Number(user.userId),
                    enable: false,
                    expiryTimeMs: user.expiresAt?.getTime() || 0,
                });

                console.log(`Deactivated user ${user.userId}`);
            } catch (err) {
                console.error(`Error deactivating user ${user.userId}:`, err);
            }
        }
    });
}