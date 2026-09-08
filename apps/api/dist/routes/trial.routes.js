import { z } from 'zod';
import { vpnService } from '../services/vpn.service.js';
import { env } from '../config/env.js';
export async function trialRoutes(app) {
    app.post('/api/trial', async (request, reply) => {
        const secret = request.headers['x-internal-secret'];
        if (secret !== env.INTERNAL_API_SECRET) {
            return reply.code(403).send({ error: 'Forbidden' });
        }
        const schema = z.object({ userId: z.number() });
        const { userId } = schema.parse(request.body);
        const result = await vpnService.activateTrial(BigInt(userId));
        if (!result.success) {
            return reply.code(400).send({ error: result.message });
        }
        return { success: true, subscriptionUrl: result.subUrl };
    });
}
