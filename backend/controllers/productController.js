import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc   Fetch all products
// @route  GET /api/products
// @access Public

const getProducts = asyncHandler(async (req,res)  => {
    const products= await Product.find({})
    res.json(products)
})


// @desc   Fetch single product by id
// @route  GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req,res)  => {
    const product = await Product.findById(req.params.id)

    if (product) {
         res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
})

// @desc   Delete single product by id
// @route  DELETE /api/products/:id
// @access Private/admin

const deleteProduct = asyncHandler(async (req,res)  => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({message:'Product removed!'})
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
})

// @desc   Create product 
// @route  POST /api/products
// @access Private/admin

const createProduct = asyncHandler(async (req,res)  => {
    const product = new Product({
        name: 'Sample name',
        category: 'Sample Cat',
        price: 0,
        brand: 'Sample Brand',
        user: req.user._id,
        image: '/images/sample.jpg',
        countInStock: 0,
        numReviews: 0,
        description:'Sample desc'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc   Update product 
// @route  PUT /api/products/:id
// @access Private/admin

const updateProduct = asyncHandler(async (req, res) => {
    
    const product = await Product.findById(req.params.id)

    const {
        name,
        price,
        description,
        image,
        brand,
        countInStock,
        numReviews
    } = req.body

    if (product) {
        product.name = name,
        product.price = price
        product.description = description
        product.brand = brand
        product.image = image
        product.countInStock = countInStock
        product.numReviews = numReviews
        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
})


export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}