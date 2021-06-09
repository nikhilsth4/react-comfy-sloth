import axios from 'axios'
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
} from '../products/types'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
} from './types'

export const setGridview = () => ({
  type: SET_GRIDVIEW,
})
export const setListview = () => ({
  type: SET_LISTVIEW,
})

export const loadProducts = async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_BEGIN })
  try {
    const res = await axios.get('https://course-api.com/react-store-products')
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: res.data,
    })
    dispatch({
      type: LOAD_PRODUCTS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_ERROR })
  }
}

export const updateSort = (e) => (dispatch) => {
  const value = e.target.value
  dispatch({
    type: UPDATE_SORT,
    payload: value,
  })
}

export const updateFilters = (e) => (dispatch) => {
  let name = e.target.name
  let value = e.target.value
  if (name === 'category') {
    value = e.target.textContent
  }
  if (name === 'color') {
    value = e.target.dataset.color
  }
  if (name === 'price') {
    value = Number(value)
  }
  if (name === 'shipping') {
    value = e.target.checked
  }
  dispatch({
    type: UPDATE_FILTERS,
    payload: {
      name,
      value,
    },
  })
}

export const clearFilters = () => ({
  type: CLEAR_FILTERS,
})
