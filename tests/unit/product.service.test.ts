import * as productService from '../../src/services/productService'
import db from '../../src/db/knex';

describe('Product Service', () => {
    beforeAll(async () => {

    });

    afterAll(async () => {
        await db.destroy();
    });

    it('should create a product', async () => {
        const data = {
            sku: 'TEST-123',
            name: 'Test Product',
            attributes: { color: 'red', size: 'M' },
        };

        const result = await productService.createProduct(data);
        expect(result).toMatchObject({
            sku: 'TEST-123',
            name: 'Test Product',
            attributes: { color: 'red', size: 'M' },
        });
    });

    it('should fetch product by ID', async () => {
        const product = await productService.createProduct({
            sku: 'TEST-456',
            name: 'Another Product',
            attributes: { color: 'blue' },
        });

        const fetched = await productService.getProductById(product.id);
        expect(fetched?.sku).toBe('TEST-456');
    });

    it('should filter products by attribute', async () => {
        const products = await productService.getProductsByAttributes({ color: 'red' });
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].attributes.color).toBe('red');
    });
});