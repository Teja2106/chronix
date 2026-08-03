import { sql } from 'drizzle-orm';
import { db } from './index';
import { getLogger } from '@logtape/logtape';

const logger = getLogger(['chronix', 'database']);

export async function verifyDatabaseConnection() {
    try {
        logger.info('Checking PostgreSQL connection...');

        const result = await db.execute(sql`SELECT version();`);

        logger.info('Database connected.');
        logger.debug("{}", () => ({ result }));
    } catch (err) {
        logger.error('Database connection failed.');
        console.error('Full error: ', err);

        if (err instanceof Error) {
            console.error('Message: ', err.message);
            console.error('Cause: ', err.cause);
            logger.error("{}", () => ({ message: err.message }));
        }

        throw err;
    }
}