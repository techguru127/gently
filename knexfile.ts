import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
        },
        migrations: { directory: './src/db/migrations' },
        seeds: { directory: './src/db/seeds' },
    },

    test: {
        client: 'pg',
        connection: {
            host: process.env.TEST_DATABASE_HOST,
            port: Number(process.env.TEST_DATABASE_PORT),
            database: process.env.TEST_DATABASE_NAME,
            user: process.env.TEST_DATABASE_USER,
            password: process.env.TEST_DATABASE_PASSWORD,
        },
        migrations: { directory: './src/db/migrations' },
        seeds: { directory: './src/db/seeds' },
    },
};

export default config;
