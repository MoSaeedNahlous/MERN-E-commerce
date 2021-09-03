import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'

// @desc   Create new order
// @route  POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req,res)  => {
    
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length ===0) {
        res.status(400)
        throw new Error('No order items!')
        return
    } else {
        const order = new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()

    res.status(201).json(createdOrder)
    }

    
})

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
    
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error("Order not found!")
    }
    
})


// @desc   Update order to Paid
// @route  GET /api/orders/:id/pay
// @access Private

const UpdateOrderToPaid = asyncHandler(async (req, res) => {
    //orderId , userinfo_id
    const order = await Order.findById(req.params.id)
    const user = await User.findById(req.body.userId)
    if (order && user) {
        //TODO: if balance is bigger or equal then...
        if (order.totalPrice < user.balance) {
            order.isPaid = true
            order.paidAt = Date.now()
            user.balance = user.balance - order.totalPrice
            const updatedUser = await user.save()
            const updatedOrder = await order.save()
            
            res.json(updatedOrder)
        } else {
            res.json('Not enough balance').status(400)
            return
        }
        

        

        
    } else {
        res.status(404)
        throw new Error("Order not found!")
    }
    
})

// @desc   Get orders for current user
// @route  GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {


    const orders = await Order.find({user:req.user._id})
    
    if (orders) {
        res.json(orders)
    } else {
        res.status(404)
        throw new Error("Orders not found!")
    }
    
})





export{addOrderItems,getOrderById,UpdateOrderToPaid,getMyOrders}