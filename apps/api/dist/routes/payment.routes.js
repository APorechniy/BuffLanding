import crypto from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { vpnService } from '../services/vpn.service.js';
import { env } from '../config/env.js';
const prisma = new PrismaClient();
export async function paymentRoutes(app) {
    app.post('/webhook/payment', async (request, reply) => {
        const signature = request.headers['x-signature'];
        const bodyText = JSON.stringify(request.body);
        // Проверка HMAC подписи
        const expectedSig = crypto
            .createHmac('sha256', env.PAYMENT_SECRET_KEY)
            .update(bodyText)
            .digest('hex');
        if (signature !== expectedSig) {
            return reply.code(403).send({ error: 'Invalid signature' });
        }
        const { order_id, status } = request.body;
        if (status === 'success') {
            const payment = await prisma.payment.findUnique({ where: { orderId: order_id } });
            if (payment && payment.status !== 'success') {
                await prisma.payment.update({
                    where: { orderId: order_id },
                    data: { status: 'success' },
                });
                // Начисляем 30 дней подписки
                await vpnService.grantVpnAccess(payment.userId, 30);
            }
        }
        return { status: 'ok' };
    });
}
