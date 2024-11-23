import { Schema, model } from 'mongoose'
import { TProducts } from './products.interface'

const productSchema = new Schema<TProducts>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
    },
    brand: {
      type: String,
      required: [true, 'Brand name is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price must be a positive number.'],
    },
    type: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        message:
          '{VALUE} Type must be one of: Mountain, Road, Hybrid, BMX, Electric.',
      },
      required: [true, 'Product type is required.'],
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [0, 'Quantity must be a positive number.'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export const ProductsModel = model<TProducts>('Products', productSchema)
