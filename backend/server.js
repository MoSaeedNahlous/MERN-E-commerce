import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import {errorHandler,notFound} from './middleware/errorMiddleware.js'



dotenv.config({ path: '../.env' })

connectDB()

const app = express();

// app.use((req, res, next) => {
//     console.log(req.originalUrl);
//     next()
// })

app.use('/api/products', productRoutes)

app.use(errorHandler)

app.use(notFound)



app.get('/', (req,res) => {
    res.send('API is running...')
})



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.underline);
})