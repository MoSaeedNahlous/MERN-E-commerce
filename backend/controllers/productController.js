import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc   Fetch all products
// @route  GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 3
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options:'i'
        }
    } : {

    }


    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    
    res.json({products ,page, pages:Math.ceil(count / pageSize)})
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


// @desc   Create new review 
// @route  Post /api/products/:id/reviews
// @access Private

const createReview = asyncHandler(async (req, res) => {
    
    const product = await Product.findById(req.params.id)

    const {
        rating,
        comment
    } = req.body

    if (product) {
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }
        
        const review = {
            name: req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }

        product.reviews.push(review)

        //update reviews number and rating with the addition of this new review
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc,currentReview)=> currentReview.rating + acc ,0)/product.reviews.length

        await product.save()

        res.status(201).json({message : 'Review Added!'})

    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
})

// @desc   Get top rated products 
// @route  GET /api/products/top
// @access Public

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating:-1}).limit(3)
    res.json(products)
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createReview,
    getTopProducts
}