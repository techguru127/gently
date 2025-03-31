import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/products';

const app = express();

app.use(bodyParser.json());
app.use('/products', productRoutes);

export default app;