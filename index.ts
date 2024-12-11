import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { ProductRouter } from './routes/products.route';

dotenv.config();
const app = express();
app.use(cors());
app.use('/products', ProductRouter);
app.listen( process.env.PORT, () => {
  console.log('App listening on port: ', process.env.PORT);
});