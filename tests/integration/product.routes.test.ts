import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db/knex';

describe('Product API', () => {
    beforeAll(async () => {
        
    });

    afterAll(async () => {
        await db.destroy();
    });

    it('POST /products - creates a product', async () => {
        const res = await request(app).post('/products').send({
            sku: 'API-001',
            name: 'API Product',
            attributes: { category: 'tech' },
        });

        expect(res.status).toBe(201);
        expect(res.body.name).toBe('API Product');
    });

    it('GET /products/:id - fetches product by ID', async () => {
        const postRes = await request(app).post('/products').send({
            sku: 'API-002',
            name: 'Another API Product',
            attributes: { category: 'books' },
        });

        const id = postRes.body.id;
        const getRes = await request(app).get(`/products/${id}`);
        expect(getRes.status).toBe(200);
        expect(getRes.body.id).toBe(id);
    });

    it('GET /products - filters by custom attribute', async () => {
        await request(app).post('/products').send({
            sku: 'FILTER-001',
            name: 'Filter Product',
            attributes: { brand: 'Nike' },
        });

        const res = await request(app).get('/products').query({ brand: 'Nike' });
        expect(res.status).toBe(200);
        expect(res.body[0].attributes.brand).toBe('Nike');
    });
});
