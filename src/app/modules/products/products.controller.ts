import { Request, Response } from 'express'
import productValidationSchema from './products.validation'
import { productService } from './products.service'

// create product
const createProducts = async (req: Request, res: Response) => {
  try {
    const productsData = req.body

    // data validation using zod
    const zodParsedData = productValidationSchema.parse(productsData)

    // will call service function call data
    const result = await productService.createProductsIntoDB(zodParsedData)
    res.status(200).json({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Something Went Wrong',
      error: err,
    })
  }
}

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query // Extract query parameter

    // will call service function call data
    const products = await productService.getProductsIntoDB()

    // If `searchTerm` is provided, filter products
    let filteredProducts = products
    if (searchTerm) {
      const lowercasedTerm = (searchTerm as string).toLowerCase()
      filteredProducts = products.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (product: any) =>
          product.name?.toLowerCase().includes(lowercasedTerm) ||
          product.brand?.toLowerCase().includes(lowercasedTerm) ||
          product.type?.toLowerCase().includes(lowercasedTerm),
      )
    }

    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: filteredProducts,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'Something Went Wrong',
      error: err.message,
    })
  }
}

// get single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    // will call service function call data
    const result = await productService.getSingleProductIntoDB(productId)
    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'Something Went Wrong',
      error: err.message,
    })
  }
}

// update specific products
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const body = req.body

    // will call service function call data
    const result = await productService.updateProductIntoDB(productId, body)
    res.status(200).json({
      success: true,
      message: 'Bicycle updated successfully',
      data: result,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Something Went Wrong',
      error: err.message,
    })
  }
}

// delete specific products
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId

    // will call service function call data
    const result = await productService.deleteProductIntoDB(productId)
    res.status(200).json({
      success: true,
      message: 'Bicycle deleted successfully',
      data: result,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Something Went Wrong',
      error: err.message,
    })
  }
}

export const productsController = {
  createProducts,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
