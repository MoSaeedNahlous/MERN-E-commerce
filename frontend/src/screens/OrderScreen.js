/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder , deliverOrder } from '../actions/orderActions'
import { getUserDetails } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConsts'

const OrderScreen = ({ match,history }) => {
    
    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { success: successDeliver, loading: loadingDeliver } = orderDeliver
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        dispatch(getOrderDetails(orderId))
        //if we paid Successfully or not paid then re render
        if (!order || successPay || successDeliver) {
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
        }
        
    }, [successPay, successDeliver, orderId, dispatch, userInfo])
    
    const paymentHandler = () => {
        dispatch(payOrder(orderId))
        dispatch(getUserDetails('profile'))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(orderId))
        dispatch(getUserDetails('profile'))
    }

    //  calculate prices
    if (!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }
    
    return loading ?
        <Loader /> :
        error ?
            <Message variant='danger'>{error}</Message> :
            <>
                <h1>Order {order._id}</h1>
                <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <strong>Name:</strong>{order.user.name}
                            <br />
                            <strong>Email:</strong>
                            <a href={`mailto:${order.user.email}`}>
                                {order.user.email}  
                            </a>  
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city},
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country}

                                
                                {order.isDelivered ?
                                    <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                    :
                                    <Message variant='danger'>Not Delivered</Message>
                                }   
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>

                                {order.isPaid ?
                                    <Message variant='success'>Paid on {order.paidAt}</Message>
                                    :
                                    <Message variant='danger'>Not Paid</Message>
                                }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ?
                                <Message>Order is empty!</Message> :
                                (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => 
                                            
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col >
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${item.qty*item.price}
                                                    </Col>
                                                    
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                        }
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid &&
                                <ListGroup.Item>
                                
                            <Button
                                className='btn-with-full-width'
                                onClick={paymentHandler}
                            >
                              Pay Order      
                            </Button>
                                </ListGroup.Item>}
                            
                            {loadingDeliver && <Loader />}
                            
                             {order.isPaid && !order.isDelivered && userInfo && userInfo.isAdmin &&
                                <ListGroup.Item>
                                
                            <Button
                                className='btn-with-full-width'
                                onClick={deliverHandler}
                            >
                              Deliver Order      
                            </Button>
                                </ListGroup.Item>}
                            
                        
                        
                        
                    </Card>
                </Col>
            </Row>
            </>
            
}

export default OrderScreen
