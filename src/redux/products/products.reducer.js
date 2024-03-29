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

const INITIAL_STATE = {
  isSideBarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: [],
}

const products = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return {
        ...state,
        isSideBarOpen: true,
      }
    case SIDEBAR_CLOSE:
      return {
        ...state,
        isSideBarOpen: false,
      }
    case GET_PRODUCTS_BEGIN:
      return {
        ...state,
        products_loading: true,
      }
    case GET_PRODUCTS_SUCCESS:
      const featured_products = action.payload.filter(
        (product) => product.featured === true
      )
      return {
        ...state,
        products_loading: false,
        products: action.payload,
        featured_products,
      }
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        products_loading: false,
        products_error: true,
      }
    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        single_product_loading: true,
      }
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload,
        single_product_error: false,
      }
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      }
    default:
      return state
  }
}
export default products
