import { z } from 'zod'

// Define the Zod schema
const orderValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .regex(/^\S+@\S+\.\S+$/, {
      message: 'Please enter a valid email address.',
    }), // Email format validation using regex,
  product: z.string().min(1, { message: 'product is required' }),
  quantity: z.number().min(1, { message: 'quantity is required' }),
  totalPrice: z.number(),
})

export default orderValidationSchema
