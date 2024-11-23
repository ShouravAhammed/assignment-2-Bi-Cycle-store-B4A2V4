import { TProducts } from './products.interface'
import { ProductsModel } from './products.model'

// create product
const createProductsIntoDB = async (productsData: TProducts) => {
  const result = await ProductsModel.create(productsData)
  return result
}

// get all product
const getProductsIntoDB = async () => {
  const result = await ProductsModel.find()
  return result
}

// get all product
const getSingleProductIntoDB = async (productId: string) => {
  const result = await ProductsModel.findOne({ _id: productId })
  return result
}

// update specific product
const updateProductIntoDB = async (productId: string, data: TProducts) => {
  const result = await ProductsModel.findByIdAndUpdate(productId, data, {
    new: true,
  })
  return result
}

// delete specific product
const deleteProductIntoDB = async (productId: string) => {
  const result = await ProductsModel.findByIdAndDelete(productId)
  return result
}

export const productService = {
  createProductsIntoDB,
  getProductsIntoDB,
  getSingleProductIntoDB,
  updateProductIntoDB,
  deleteProductIntoDB,
}
