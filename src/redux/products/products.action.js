import axios from 'axios'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from './types'

export const openSideBar = () => ({ type: SIDEBAR_OPEN })

export const closeSideBar = () => ({ type: SIDEBAR_CLOSE })

export const fetchProducts = async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_BEGIN })
  try {
    const res = await axios.get('https://course-api.com/react-store-products')
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_ERROR })
  }
}
export const fetchSingleProduct = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
  try {
    const res = await axios.get(
      `https://course-api.com/react-store-single-product?id=${id}`
    )
    dispatch({
      type: GET_SINGLE_PRODUCT_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
  }
}
