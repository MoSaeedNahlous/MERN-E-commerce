import jwt from 'jsonwebtoken'
import asynchHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asynchHandler(async (req, res, next) => {
    
    let token

    if (req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')) {
        
        try {
            //Bearer XXXXXXXXX
            //req.headers.authorization.split(' ')[0] is 'Bearer'
            //req.headers.authorization.split(' ')[1] is XXXXXXX

            token = req.headers.authorization.split(' ')[1]

            // decoded = id + iat + exp
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //bring everything about that user without the password field
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            //if token is not valid or expired
            console.error(error);
            res.status(401)
            throw new Error('Not authorized!,token is not valid!')
        }
    }

    //if token is not included in the request
    if (!token) {
        res.status(401)
        throw new Error ('Not authorized!,no token!')
    }


})
const deputy = (req,res,next) => {
    if (req.user && req.user.isDeputy) {
        next()
    } else {
        res.status(401)
        throw new Error('NOT AUTHORIZED!!')
    }
}

const admin = (req,res,next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('NOT AUTHORIZED!!')
    }
}

export default protect