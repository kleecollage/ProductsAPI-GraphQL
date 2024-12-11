import { NextFunction, Request, Response } from "express";
import Product from "../models/products.model";

//** ------------------------------ GET ALL PRODUCTS ------------------------------  **//
export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.findAll()
    res.status(200).json({
      products,
      msg: 'Products ok',
    });
  } catch (error) {
    next(error)
  }
}
//** ------------------------------ GET PRODUCT BY ID ------------------------------  **//
export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  try {
    if (!id) res.status(404).json({ msg: 'ID not exists'})

    const product = await Product.findOne({
      where: {
        id,
        active: true
      },
    });

    if (!product) res.status(404).json({ msg: 'Product not found'})

      res.status(200).json({
      product,
      msg: 'Products ok',
    })
  } catch (error) {
    next(error)
  }

}
//** ------------------------------ CREATE PRODUCT ------------------------------  **//
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const {name, price, stock} = req.body

  try {
    const product = await Product.create({name, price, stock})

    res.status(200).json({ product })
  } catch (error) {
    res.status(500).json({
      msg: `Product ${name} is not created`,
      error,
    })
  }
}
//** ------------------------------ UPDATE PRODUCT ------------------------------  **//
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const {name, price, stock} = req.body;
  const { id } = req.params;

  if (!id) res.status(404).json({ msg: 'ID not exists'})

  try {
    const product = await Product.update({
      name,
      price,
      stock
    }, {
      where: {
        id,
        active: true,
       },
    },
  )

   res.status(200).json({ product })
  } catch (error) {
   res.status(500).json({
      msg: `Product ${name} is not created`,
      error,
    })
  }
}
//** ------------------------------ DELETE PRODUCT ------------------------------  **//
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) res.status(404).json({ msg: 'ID not exists'})

  try {
    const product = await Product.update({
      active: false
    }, {
      where: {
        id,
        active: true,
       },
    },
  )

   res.status(200).json({ product })
  } catch (error) {
   res.status(500).json({
      msg: `Product ${id} not exists`,
      error,
    })
  }
}