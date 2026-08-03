import { registerOTel } from '@vercel/otel';

export async function register() {
    registerOTel({
        serviceName: 'chronix'
    });

    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { configureLogging } = await import('./telemetry/logs');
        const { verifyDatabaseConnection } = await import('./db/health');

        await configureLogging();

        try {
            await verifyDatabaseConnection();
        } catch (err) {
            await new Promise((resolve) => setTimeout(resolve, 3000));

            process.exit(1);
        }
    }
}