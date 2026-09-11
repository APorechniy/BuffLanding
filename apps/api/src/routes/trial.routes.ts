import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { vpnService } from '../services/vpn.service.js';
import { env } from '../config/env.js';

export async function trialRoutes(app: FastifyInstance) {
    app.post('/api/trial', async (request, reply) => {
        try {
            const secret = request.headers['x-internal-secret'];
            if (secret !== env.INTERNAL_API_SECRET) {
                return reply.code(403).send({ error: 'Forbidden' });
            }

            const schema = z.object({ email: z.string().email() });
            const { email } = schema.parse(request.body);

            const result = await vpnService.activateTrial(email);

            if (!result.success) {
                return reply.code(400).send({
                    error: result.message,
                    status: result.status,
                    expiresAt: result.expiresAt,
                });
            }

            return {
                success: true,
                status: result.status,
                subscriptionUrl: result.subUrl,
            };
        } catch (e) {
            return reply.code(500).send({
                error: "Произошла ошибка, попробуйте позднее",
            });
        }
    });
}