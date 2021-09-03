import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'





dotenv.config({ path: '../.env' })

connectDB()

const app = express();

app.use(express.json())

// app.use((req, res, next) => {
//     console.log(req.originalUrl);
//     next()
// })

app.use('/api/products' , productRoutes)

app.use('/api/users' , userRoutes)

app.use('/api/orders' , orderRoutes)

app.use(errorHandler)

//should be the last middleware
// "app.router" positions our routes
// above the middleware defined below,
// this means that Express will attempt
// to match & call routes _before_ continuing
// on, at which point we assume it's a 404 because
// no route has handled the request.
app.use(notFound)





app.get('/', (req,res) => {
    res.send('API is running...')
})



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.underline);
})