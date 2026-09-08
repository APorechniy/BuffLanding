import { buildApp } from './app.js';
import { env } from './config/env.js';
import { initScheduler } from './jobs/scheduler.js';
const app = buildApp();
async function start() {
    try {
        initScheduler();
        await app.listen({ port: env.PORT, host: '0.0.0.0' });
        console.log(`🚀 API Server running on port ${env.PORT}`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}
start();
