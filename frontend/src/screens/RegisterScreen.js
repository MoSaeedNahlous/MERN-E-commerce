import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = ({location,history}) => {

    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        message: null
    })

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading , error, userInfo } = userRegister

    useEffect(() => {

        if (userInfo) {
            history.push(redirect)
        }

    },[history,userInfo,redirect])

    const changeHandler = (e) => {
        setRegisterInfo({...registerInfo,message:null})
        setRegisterInfo({...registerInfo,[e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (registerInfo.password === registerInfo.confirmPassword) {
            dispatch(register(
            registerInfo.name,
            registerInfo.email,
            registerInfo.password
        ))
        } else {
            setRegisterInfo({...registerInfo,message:'Check your entered passwords!'})
        }
        

    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error
                && <Message variant='danger'>{error}</Message>}
            
            {registerInfo.message
                && <Message variant='danger'>{registerInfo.message}</Message>}
            
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        name='name'
                        onChange={changeHandler}
                        required
                    >
                    </Form.Control>
                </Form.Group>
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
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='ReEnter password'
                        name='confirmPassword'
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
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already Got An Account? <Link
                        to={redirect
                            ? `/login?redirect=${redirect}`
                            : '/login'
                        }
                    >Sign In Here!</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
