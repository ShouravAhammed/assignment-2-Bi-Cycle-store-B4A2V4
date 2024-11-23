import express from 'express'
import cors from 'cors'
import { ProductsRoutes } from './app/modules/products/products.route'
import { ordersRoute } from './app/modules/orders/orders.route'
const app = express()

// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/products', ProductsRoutes)
app.use('/api/orders', ordersRoute)

app.get('/', (req, res) => {
  res.send('Hello Bi-Cycle!')
})

export default app
