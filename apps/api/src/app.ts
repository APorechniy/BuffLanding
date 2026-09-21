import Fastify from 'fastify';
import cors from '@fastify/cors';
import { trialRoutes } from './routes/trial.routes.js';
import { paymentRoutes } from './routes/payment.routes.js';
import { usersRouter } from './routes/users.routes.js';

export function buildApp() {
    const app = Fastify({ logger: true });

    app.register(cors, { origin: '*' });

    // Регистрация маршрутов
    app.register(trialRoutes);
    app.register(paymentRoutes);
    app.register(usersRouter);

    app.get('/health', async () => ({ status: 'ok', timestamp: new Date() }));

    return app;
}