import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS
} from '../constants/orderConsts'
import axios from 'axios'
import { logout } from './userActions'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

      const { data } = await axios.post(
          `/api/orders`,
          order,
          config
      )

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
      //TODO:reset the cart and success status
      localStorage.removeItem('cartItems')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized!,token is not valid!') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}