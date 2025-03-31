import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('sku').notNullable().unique();
        table.string('name').notNullable();
        table.jsonb('attributes').notNullable().defaultTo('{}');
        table.timestamps(true, true);
    });
    await knex.raw(`CREATE INDEX idx_products_attributes ON products USING GIN (attributes)`);
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('products');
}