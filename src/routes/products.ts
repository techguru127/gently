import express from 'express';
import * as productController from '../controllers/productController';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProductsByAttributes);
router.get('/:id', productController.getProductById);

export default router;
