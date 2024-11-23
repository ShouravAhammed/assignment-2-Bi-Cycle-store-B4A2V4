import express from 'express'
import { productsController } from './products.controller'

const router = express.Router()

// we will call controller function
router.post('/', productsController.createProducts)
router.get('/', productsController.getAllProducts)
router.get('/:productId', productsController.getSingleProduct)
router.put('/:productId', productsController.updateProduct)
router.delete('/:productId', productsController.deleteProduct)

export const ProductsRoutes = router
