import { Request, Response } from 'express';
import * as productService from '../services/productService';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create product', details: err });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch product', details: err });
    }
};

export const getProductsByAttributes = async (req: Request, res: Response) => {
    try {
        const products = await productService.getProductsByAttributes(req.query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products', details: err });
    }
};
