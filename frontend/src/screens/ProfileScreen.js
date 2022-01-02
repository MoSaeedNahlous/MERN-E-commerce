/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserProfile } from '../actions/userActions'
import { getMyOrdersList } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConsts'

const ProfileScreen = ({history}) => {

    const [details, setDetails] = useState({
        name: '',
        email: '',
        password:'',
        confirmPassword:'',
        message: null
    })

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const myOrders = useSelector((state) => state.myOrders)
    const { loading: loadingOrders, error: errorOrders, orders } = myOrders
    
    useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(getMyOrdersList())
      } else {
        setDetails({
                    ...details,
                    name: user.name,
                    email:user.email
                })
      }
    }
  }, [dispatch, history, userInfo, user, success])

    const changeHandler = (e) => {
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (details.password !== details.confirmPassword) {
        setDetails({...details,message:'Passwords do not match'})
        } else {
            dispatch(updateUserProfile({
                id: user._id,
                name:details.name,
                email:details.email,
                password:details.password,
            }))
             setDetails({...details,message:''})
        }
    }
        

    
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
            {error
                    && <Message variant='danger'>{error}</Message>}
            {success
                    && <Message variant='success'>Profile Updated!</Message>}
            {details.message
                    && <Message variant='danger'>{details.message}</Message>}
            
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                            type='text'
                            value={details.name}
                        placeholder='Enter name'
                        name='name'
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email
                    </Form.Label>
                        <Form.Control
                            value={details.email}
                        type='email'
                        placeholder='Enter email'
                        name='email'
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        name='password'
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='ReEnter password'
                        name='confirmPassword'
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                </Form.Group>
                <br />
                <Button
                    type='submit'
                    variant='primary'
                >
                    Update
                </Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                    {loadingOrders ?
                        <Loader /> :
                        errorOrders ?
                        <Message variant='danger'>{errorOrders}</Message> :
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0,10)}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>
                                                {
                                                    order.isPaid
                                                        ?order.paidAt.substring(0, 10)
                                                        :<i
                                                            className="fas fa-times"
                                                            style={{color:'red'}}
                                                        ></i>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    order.isDelivered
                                                        ?order.deliveredAt.substring(0, 10)
                                                        :<i
                                                            className="fas fa-times"
                                                            style={{color:'red'}}
                                                        ></i>
                                                }
                                            </td>
                                            <td>
                                                <Button
                                                    className='btn-sm'
                                                    onClick={() => {
                                                        history.push(`/order/${order._id}`)
                                                    }}
                                                >
                                                    Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                    </Table>
                    }
            </Col>
        </Row>
    )
            }

export default ProfileScreen
