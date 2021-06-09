import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from './types'

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (!cart) {
    return []
  } else {
    return JSON.parse(localStorage.getItem('cart'))
  }
}

const INITIAL_STATE = {
  cart_items: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload
      const tempItem = state.cart_items.find((i) => i.id === id + color)

      if (tempItem) {
        const tempCart = state.cart_items.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return { ...cartItem, amount: newAmount }
          } else {
            return cartItem
          }
        })
        return {
          ...state,
          cart_items: tempCart,
        }
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        }
        return {
          ...state,
          cart_items: [...state.cart_items, newItem],
        }
      }
    /* falls through */

    case REMOVE_CART_ITEM:
      const tempCart = state.cart_items.filter(
        (item) => item.id !== action.payload
      )
      return { ...state, cart_items: tempCart }
    /* falls through */

    case CLEAR_CART:
      localStorage.setItem('cart', [])
      return { ...state, cart_items: [] }
    /* falls through */

    case TOGGLE_CART_ITEM_AMOUNT:
      const { id: itemId, value } = action.payload
      const temCart = state.cart_items.map((item) => {
        if (item.id === itemId) {
          if (value === 'inc') {
            let newAmount = item.amount + 1
            if (newAmount > item.max) {
              newAmount = item.max
            }
            return { ...item, amount: newAmount }
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1
            if (newAmount < 1) {
              newAmount = 1
            }
            return { ...item, amount: newAmount }
          }
        }
        return item
      })

      return { ...state, cart_items: temCart }
    /* falls through */

    case COUNT_CART_TOTALS:
      if (state.cart_items) {
        const { total_items, total_amount } = state.cart_items.reduce(
          (total, cartItem) => {
            const { amount, price } = cartItem
            total.total_items += amount
            total.total_amount += price * amount
            return total
          },
          {
            total_items: 0,
            total_amount: 0,
          }
        )
        return { ...state, total_amount, total_items }
      }
    /* falls through */

    default:
      return state
  }
}

export default userReducer
