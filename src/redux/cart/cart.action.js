import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from './types'

export const addToCart = (id, color, amount, product) => ({
  type: ADD_TO_CART,
  payload: { id, color, amount, product },
})

export const clearCart = () => ({ type: CLEAR_CART })

export const countCartTotals = () => ({ type: COUNT_CART_TOTALS })

export const removeItem = (id) => ({ type: REMOVE_CART_ITEM, payload: id })

export const toggleAmount = (id, value) => ({
  type: TOGGLE_CART_ITEM_AMOUNT,
  payload: { id, value },
})
