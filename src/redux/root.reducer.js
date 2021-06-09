import { combineReducers } from 'redux'
import productsReducer from './products/products.reducer'
import filtersReducer from './filters/filters.reducer'
import cartReducer from './cart/cart.reducer'
import userReducer from './user/user.reducer'

export const rootReducer = combineReducers({
  products: productsReducer,
  filters: filtersReducer,
  cart: cartReducer,
  user: userReducer,
})
