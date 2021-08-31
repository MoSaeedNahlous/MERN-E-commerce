import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const LoginScreen = ({location,history}) => {

    const [loginInfo, setLoginInfo] = useState({email:'',password:''})

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading , error, userInfo } = userLogin

    useEffect(() => {

        if (userInfo) {
            history.push(redirect)
        }

    },[history,userInfo,redirect])

    const changeHandler = (e) => {
        setLoginInfo({...loginInfo,[e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(loginInfo.email,loginInfo.password))

    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        name='email'
                        onChange={changeHandler}
                        required
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
                        required
                    >
                    </Form.Control>
                </Form.Group>
                <br />
                <Button
                    type='submit'
                    variant='primary'
                >
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={redirect
                            ? `/register?redirect=${redirect}`
                            : '/register'
                        }
                    >Sign Up Here!</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
