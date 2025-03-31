import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('products').del();

    await knex('products').insert([
        {
            sku: 'APPLE001',
            name: 'Red Apple',
            attributes: { color: 'red', size: 'medium', type: 'fruit' },
        },
        {
            sku: 'SHOE001',
            name: 'Running Shoe',
            attributes: { size: 'US11', material: 'leather', model: 'RX100' },
        },
    ]);
}
