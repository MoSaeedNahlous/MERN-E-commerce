import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'

const PaymentScreen = ({ history }) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>
                
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            disabled
                            onChange={(e)=>{setPaymentMethod(e.target.value)}}
                        >
                        </Form.Check>
                        <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            disabled
                            onChange={(e)=>{setPaymentMethod(e.target.value)}}
                        >
                        </Form.Check>
                        <Form.Check
                            type='radio'
                            label='My Balance'
                            id='Stripe'
                            name='paymentMethod'
                            value='MyBalance'
                            checked
                            onChange={(e)=>{setPaymentMethod(e.target.value)}}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <br />
                <Button
                    type='submit'
                    variant='primary'
                >
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
