import dotenv from 'dotenv';
import db from './src/db/knex';

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
    await db.migrate.rollback(undefined, true);
    await db.migrate.latest();
});

afterAll(async () => {
    await db.destroy();
});