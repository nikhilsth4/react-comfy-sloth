import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from './types'

const INITIAL_STATE = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const products = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price)
      maxPrice = Math.max(...maxPrice)
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      }
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      }
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      }
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      }
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state
      let tempProducts = [...filtered_products]
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      return {
        ...state,
        filtered_products: tempProducts,
      }

    case UPDATE_FILTERS:
      const { name, value } = action.payload
      return {
        ...state,
        filters: { ...state.filters, [name]: value },
      }
    case FILTER_PRODUCTS:
      const { all_products } = state
      const { text, category, company, color, price, shipping } = state.filters

      let temProducts = [...all_products]

      if (text) {
        temProducts = temProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text)
        })
      }

      if (category !== 'all') {
        temProducts = temProducts.filter(
          (product) => product.category === category
        )
      }

      if (company !== 'all') {
        temProducts = temProducts.filter(
          (product) => product.company === company
        )
      }
      if (color !== 'all') {
        temProducts = temProducts.filter((product) => {
          return product.colors.find((c) => c === color)
        })
      }
      temProducts = temProducts.filter((product) => product.price <= price)

      if (shipping === true) {
        temProducts = temProducts.filter((product) => {
          product.shipping = true
        })
      }

      return { ...state, filtered_products: temProducts }

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      }

    default:
      return state
  }
}
export default products
