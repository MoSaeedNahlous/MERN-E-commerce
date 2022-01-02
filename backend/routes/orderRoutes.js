import express from 'express'
import {
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOrderById,
    UpdateOrderToDelivered,
    UpdateOrderToPaid
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, UpdateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, UpdateOrderToDelivered)

export default router