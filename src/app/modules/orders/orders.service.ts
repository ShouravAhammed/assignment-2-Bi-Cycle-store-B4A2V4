import { TOrder } from './orders.interface'
import { OrderModel } from './orders.model'

// create order
const createOrdersIntoDB = async (ordersData: TOrder) => {
  const result = await OrderModel.create(ordersData)
  return result
}
// totalRevenue
const totalRevenue = async () => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: null, // Group by null to calculate total for all documents
        totalRevenue: { $sum: '$totalPrice' }, // Sum up the totalPrice field
      },
    },
  ])
  return result
}
// get total order
const getAllOrdersIntoDB = async () => {
  const result = await OrderModel.find()
  return result
}
// get Single order
const getSingleOrdersIntoDB = async (id: string) => {
  const result = await OrderModel.findOne({ _id: id })
  return result
}
// update Single order
const updateSingleOrdersIntoDB = async (id: string, data: TOrder) => {
  const result = await OrderModel.findByIdAndUpdate(id, data, { new: true })
  return result
}
// delete specific order
const deleteOrdersIntoDB = async (id: string) => {
  const result = await OrderModel.deleteOne({ _id: id })
  return result
}

export const ordersService = {
  createOrdersIntoDB,
  totalRevenue,
  getAllOrdersIntoDB,
  getSingleOrdersIntoDB,
  deleteOrdersIntoDB,
  updateSingleOrdersIntoDB,
}
