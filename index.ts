import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { sequelize } from './config/database';
import { ProductRouter } from './routes/products.route';

dotenv.config();
const app = express();
app.use(cors());
app.use('/products', ProductRouter);
app.listen( process.env.PORT, async () => {
  console.log('App listening on port: ', process.env.PORT);
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log(error)
  }
});