import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { PRODUCT_CREATE_RESET } from '../constants/productConsts'

const ProductsListScreen = ({history,match}) => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { products, error, loading } = productList

    const deleteProductSt = useSelector(state => state.deleteProduct)
    const { success, error: deleteError, loading: deleteLoading } = deleteProductSt
    
    const createProductSt = useSelector(state => state.createProduct)
    const { success:createSuccess, error:createError, loading:createLoading,product:createdProduct } = createProductSt

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo.isAdmin) {
             history.push('/login')
        }
        if (createSuccess) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }
    }, [dispatch, history, userInfo, success, createSuccess ,createdProduct])


    const createProductHandler = () => {
        dispatch(createProduct())
    }
    



    return (
        <>
            <Row className='align-items-center justifiy-content-between'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col md={3} className='text-right'>   
                 
                    <Button className='my-3 text-right' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col> 
            </Row>
            {createLoading && <Loader />}
            {createError && <Message variant='danger'>{createError}</Message>}
            {deleteLoading && <Loader />}
            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {
                loading?
                    <Loader /> :
                    error ?
                        <Message variant='danger'>{error}</Message> :
                        (
                            <Table
                                striped
                                bordered
                                hover
                                responsive
                                className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button
                                                    variant='light'
                                                    className='btn-sm'
                                                >
                                                    <i className="fas fa-edit"></i>
                                                    </Button>
                                                </LinkContainer>
                                                    <Button
                                                    variant='danger'
                                                    className='btn-sm'
                                                    onClick={()=>dispatch(deleteProduct(product._id))}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                    </Button>
                                                
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                    </Table>
                        )
                    }
        </>
    )
}

export default ProductsListScreen
