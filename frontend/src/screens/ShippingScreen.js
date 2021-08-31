import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'

const ShippingScreen = ({ history }) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address )
    const [city, setCity] = useState(shippingAddress.city )
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode )
    const [country, setCountry] = useState(shippingAddress.country )

    
    

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({
            address,
            city,
            postalCode,
            country
        }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control
                        value={address}
                        type='text'
                        placeholder='Enter Address'
                        onChange={(e)=>setAddress(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>
                        City
                    </Form.Label>
                    <Form.Control
                        value={city}
                        type='text'
                        placeholder='Enter City'
                        onChange={(e)=>setCity(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>
                        Postal Code
                    </Form.Label>
                    <Form.Control
                        value={postalCode}
                        type='text'
                        placeholder='Enter Postal Code'
                        onChange={(e)=>setPostalCode(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='Country'>
                    <Form.Label>
                        Country
                    </Form.Label>
                    <Form.Control
                        value={country}
                        type='text'
                        placeholder='Enter Country'
                        onChange={(e) => {
                            setCountry(e.target.value)
                        }}
                        required
                    >
                    </Form.Control>
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

export default ShippingScreen
