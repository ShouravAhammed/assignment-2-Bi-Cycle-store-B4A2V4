import { z } from 'zod'

// Define the Zod schema
const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  price: z.number().min(1, { message: 'Price must be a positive number' }),
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
    errorMap: () => ({
      message:
        "Type must be one of 'Mountain', 'Road', 'Hybrid', 'BMX', or 'Electric'",
    }),
  }),
  description: z.string().min(1, { message: 'Description is required' }),
  quantity: z
    .number()
    .min(1, { message: 'Quantity must be a positive number' }),
  inStock: z.boolean().default(true), // Optional with a default value of true
})

export default productValidationSchema
