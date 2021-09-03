import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productDetailsReducer,
    productListReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    usersListReducer,
    userUpdateProfileReducer
} from './reducers/userReducers'
import { myOrdersReducer, orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrders: myOrdersReducer,
    usersList:usersListReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')) : []

const UserInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null

const ShippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const PaymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod')) : ''

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: ShippingAddressFromStorage,
        paymentMethod:PaymentMethodFromStorage
    },
    userLogin: { userInfo: UserInfoFromStorage },
    
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store