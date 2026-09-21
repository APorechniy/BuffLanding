import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { vpnService } from '../services/vpn.service.js';
import { env } from '../config/env.js';
import { decrypt } from '@/utils/decrypt-email.js';

export async function usersRouter(app: FastifyInstance) {
    app.get('/api/user/subscribe', async (request, reply) => {
        try {
            const secret = request.headers['x-internal-secret'];
            if (secret !== env.INTERNAL_API_SECRET) {
                return reply.code(403).send({ error: 'Forbidden' });
            }

            const schema = z.object({ buffId: z.string() });
            const { buffId } = schema.parse(request.query);

            const email = decrypt(buffId)

            const result = await vpnService.getSubscriptionUrl(email);

            if (!result) {
                return reply.code(400).send({
                    error: "Произошла ошибка получения подписки",
                    status: 400,
                });
            }

            return {
                success: true,
                status: 200,
                subscriptionUrl: result,
            };
        } catch (e) {
            return reply.code(500).send({
                error: "Произошла ошибка, попробуйте позднее",
            });
        }
    });
}