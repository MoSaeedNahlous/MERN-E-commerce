import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_RESET,
  MY_ORDERS_LIST_FAIL,
  MY_ORDERS_LIST_REQUEST,
  MY_ORDERS_LIST_SUCCESS
} from '../constants/orderConsts'
import {
  CART_RESET
} from '../constants/cartConsts'
import axios from 'axios'
import { logout } from './userActions'

export const createOrder = (order) => async (dispatch, getState) => {
  try {

    //reset the current order
    dispatch({type:ORDER_RESET})

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
    //TODO:reset the cart and success status by a new const and reducer/dispatch
      dispatch({type:CART_RESET})
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

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

      const { data } = await axios.get(
          `/api/orders/${id}`,
          config
      )

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized!,token is not valid!') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const payOrder = (orderId) => async (dispatch, getState) => {
  try {
    
    dispatch({
      type: ORDER_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        {userId:userInfo._id},
          config
      )

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized!,token is not valid!') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    })
  }
}

export const getMyOrdersList = () => async (dispatch, getState) => {
  try {

    dispatch({
      type: MY_ORDERS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

      const { data } = await axios.get(
          `/api/orders/myorders`,
          config
      )

    dispatch({
      type: MY_ORDERS_LIST_SUCCESS,
      payload: data,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized!,token is not valid!') {
      dispatch(logout())
    }
    dispatch({
      type: MY_ORDERS_LIST_FAIL,
      payload: message,
    })
  }
}