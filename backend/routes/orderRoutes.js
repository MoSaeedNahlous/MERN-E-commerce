import express from 'express'
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    UpdateOrderToPaid
} from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, UpdateOrderToPaid)


export default router