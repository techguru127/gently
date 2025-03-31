import db from '../db/knex';
import { Product } from '../types';
import { ParsedQs } from 'qs';

export const createProduct = async (productData: Product) => {
    const [product] = await db('products')
        .insert(productData)
        .returning('*');
    return product;
};

export const getProductById = async (id: string) => {
    return db('products').where({ id }).first();
};

export const getProductsByAttributes = async (filters: ParsedQs) => {
    let query = db('products');
    for (const [key, value] of Object.entries(filters)) {
        query = query.whereRaw(`attributes ->> ? = ?`, [key, value]);
    }
    return query;
};
