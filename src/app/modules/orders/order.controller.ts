import { Request, Response } from 'express'
import { ordersService } from './orders.service'
import orderValidationSchema from './orders.validation'
import { productService } from '../products/products.service'
// import { productService } from '../products/products.service'

// create product
const createOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    // const ordersData = req.body
    const { email, product: productId, quantity } = req.body

    // Step 1: Fetch the product to validate stock
    const product = await productService.getSingleProductIntoDB(productId)
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      })
      return
    }
    // Step 2: Check if sufficient stock is available
    if (product.quantity < quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock available',
        data: {
          availableStock: product.quantity,
        },
      })
      return
    }
    // Step 3: Update product quantity and inStock status
    product.quantity = product.quantity - quantity
    if (product.quantity === 0) {
      product.inStock = false
    }
    await product.save()

    const totalPrice = product.price * quantity

    // Step 4: Create the order
    const order = await ordersService.createOrdersIntoDB({
      email,
      product: productId,
      quantity,
      totalPrice,
    })
    // data validation using zod
    const zodParsedData = orderValidationSchema.parse(order)

    // will call service function call data
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: zodParsedData,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: err,
    })
  }
}

// calculateRevenue
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await ordersService.totalRevenue()
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
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

// get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await ordersService.getAllOrdersIntoDB()

    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
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

// get single orders
const getSingleOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    const result = await ordersService.getSingleOrdersIntoDB(id)
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

// update order
const updateSingleOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const body = req.body
    const result = await ordersService.updateSingleOrdersIntoDB(id, body)
    res.status(200).json({
      success: true,
      message: 'Bicycles updated successfully',
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

// delete single orders
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await ordersService.deleteOrdersIntoDB(id)
    // send response
    res.status(200).json({
      success: true,
      message: 'Student is Deleted Successfully',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      error: err,
    })
  }
}

export const ordersController = {
  createOrders,
  calculateRevenue,
  getAllOrders,
  getSingleOrders,
  deleteOrder,
  updateSingleOrders,
}
