import { Request, Response } from "express"
import Product from "../models/products.model"

//** ------------------------------ GET ALL PRODUCTS ------------------------------  **//
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll()
  return res.status(200).json({
    products
    // msg: 'Products ok',
  })
}
//** ------------------------------ GET PRODUCT BY ID ------------------------------  **//
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) return res.status(404).json({ msg: 'ID not exists'})

  const product = await Product.findOne({
    where: {
      id,
      active: true
    },
  });

  if (!product) return res.status(404).json({ msg: 'Product not found'})

  return res.status(200).json({
    product
    // msg: 'Products ok',
  })
}
//** ------------------------------ CREATE PRODUCT ------------------------------  **//
export const createProduct = async (req: Request, res: Response) => {
  const {name, price, stock} = req.body

  try {
    const product = await Product.create({
      name,
      price,
      stock
    })

    return res.status(200).json({ product })
  } catch (error) {
    return res.status(500).json({
      msg: `Product ${name} is not created`,
      error,
    })
  }
}
//** ------------------------------ UPDATE PRODUCT ------------------------------  **//
export const updateProduct = async (req: Request, res: Response) => {
  const {name, price, stock} = req.body;
  const { id } = req.params;

  if (!id) return res.status(404).json({ msg: 'ID not exists'})

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

    return res.status(200).json({ product })
  } catch (error) {
    return res.status(500).json({
      msg: `Product ${name} is not created`,
      error,
    })
  }
}
//** ------------------------------ DELETE PRODUCT ------------------------------  **//
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return res.status(404).json({ msg: 'ID not exists'})

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

    return res.status(200).json({ product })
  } catch (error) {
    return res.status(500).json({
      msg: `Product ${id} not exists`,
      error,
    })
  }
}