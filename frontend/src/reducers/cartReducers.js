import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_RESET
} from '../constants/cartConsts'

//cart reducer
export const cartReducer = (state = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: '',
    }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            
            //Note : product is id ,passed from cartActions in the payload
            const existItem = state.cartItems.find(cartItem =>
                cartItem.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(cartItem =>
                        cartItem.product === existItem.product ? item : cartItem)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return { ...state,
                cartItems: state.cartItems.filter(item => action.payload !== item.product)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return { ...state,
                paymentMethod: action.payload
            }
        case CART_RESET:
            return {
                cartItems: [],
                shippingAddress: {},
                paymentMethod: '',
            }
        default:
            return state
    }
}
