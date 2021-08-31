import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserProfile } from '../actions/userActions'

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

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {

            dispatch(getUserDetails('profile'))

        } else {
                setDetails({
                    ...details,
                    name: user.name,
                    email:user.email
                })
        }
        }
    }, [dispatch, history, user])
    
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
            </Col>
        </Row>
    )
            }

export default ProfileScreen
