import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { productDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConsts'
import axios from 'axios'

const ProductEditScreen = ({ match, history }) => {
    
    const productId = match.params.id

    const [productInfo, setProductInfo] = useState({
        name: '',
        price: 0,
        brand: '',
        category: '',
        description: '',
        countInStock: '',
        numReviews: 0,
        image: '',
        uploading:false

    })

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const productDetailsSt = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetailsSt
    
    const updateProductST = useSelector(state => state.updateProduct)
    const { loading:updateLoading , error:updateError, success } = updateProductST

    useEffect(() => {
        if (success) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/products')
        } else {
            if (!product.name || product._id !== productId) {
            dispatch(productDetails(productId))
        } else {
            setProductInfo({
                ...productInfo,
                name: product.name,
                price: product.price,
                brand: product.brand,
                category: product.category,
                description: product.description,
                countInStock: product.countInStock,
                image: product.image,
                numReviews: product.numReviews,
                uploading:false
            })
        }
        }
        
        
    },[dispatch, history, productId, userInfo,product,success])

    const changeHandler = (e) => {
        setProductInfo({...productInfo,message:null})
        setProductInfo({...productInfo,[e.target.name]:e.target.value})
    }

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setProductInfo({ ...productInfo, uploading: true })
       try {
        const config = {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        }

        const { data } = await axios.post('/api/upload', formData, config)

            console.log(data);
            setProductInfo({...productInfo,image:data,uploading:false})
        
        } catch (error) {
            console.error(error)
            setProductInfo({...productInfo,uploading:false})
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name: productInfo.name,
            price: productInfo.price,
            description: productInfo.description,
            image: productInfo.image,
            category: productInfo.category,
            brand: productInfo.brand,
            countInStock: productInfo.countInStock,
            numReviews:productInfo.numReviews
        }))        

    }
    return (
        <>
            <Link to='/admin/products' className='btn btn-light my-3'>
                Go Back
            </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {updateLoading && <Loader/>}
                {updateError && <Message variant='danger'>{updateError}</Message>}
            {loading ? <Loader /> : error
                    ? <Message variant='danger'>{error}</Message>
                    : (<Form onSubmit={submitHandler}>
                        
                <Form.Group controlId='name'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        name='name'
                        value={productInfo.name}       
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>
                        Price
                    </Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter price'
                        name='price'
                        value={productInfo.price}    
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                    </Form.Group>
                        
                    <Form.Group controlId='image'>
                        <Form.Label>
                            Image 
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            name='image'
                            value={productInfo.image}       
                            onChange={changeHandler}
                            
                        >
                        </Form.Control>
                            <Form.Control
                                id='image-file'
                                label='choose file'
                                type="file"
                                custom
                                onChange={uploadFileHandler}
                            >
                            </Form.Control>
                            {productInfo.uploading && <Loader />}
                    </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>
                        Brand
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        name='brand'
                        value={productInfo.brand}       
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                        </Form.Group>
                        
                    <Form.Group controlId='countInStock'>
                    <Form.Label>
                        Count in stock
                    </Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter countInStock'
                        name='countInStock'
                        value={productInfo.countInStock}       
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId='category'>
                    <Form.Label>
                        Category
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter category'
                        name='category'
                        value={productInfo.category}       
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId='description'>
                    <Form.Label>
                        Description
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter description'
                        name='description'
                        value={productInfo.description}       
                        onChange={changeHandler}
                        
                    >
                    </Form.Control>
                </Form.Group>
                
                <br />
                <Button
                    type='submit'
                            variant='primary'
                    onClick={submitHandler}
                >
                   Update
                </Button>
            </Form>)
            }
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
