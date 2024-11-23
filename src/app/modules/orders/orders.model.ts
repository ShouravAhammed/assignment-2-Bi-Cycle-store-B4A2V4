import { Schema, model } from 'mongoose'
import { TOrder } from './orders.interface'

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'], // Custom error message for required field
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'], // Valid email regex
    },
    product: {
      type: String,
      required: [true, 'Product is required.'], // Custom error message for required field
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'], // Custom error message for required field
      min: [1, 'Quantity must be at least 1.'], // Custom error message for minimum value
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }, // Automatically adds createdAt and updatedAt fields
)

export const OrderModel = model<TOrder>('Order', orderSchema)
