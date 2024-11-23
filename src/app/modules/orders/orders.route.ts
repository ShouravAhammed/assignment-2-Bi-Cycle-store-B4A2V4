import express from 'express'
import { ordersController } from './order.controller'

const router = express.Router()

router.post('/', ordersController.createOrders)
router.get('/revenue', ordersController.calculateRevenue)
router.get('/', ordersController.getAllOrders)
router.put('/:id', ordersController.updateSingleOrders)
router.get('/:id', ordersController.getSingleOrders)
router.delete('/:id', ordersController.deleteOrder)

export const ordersRoute = router
