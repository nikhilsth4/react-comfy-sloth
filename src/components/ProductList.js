import React from 'react'
import { useSelector } from 'react-redux'

import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const filters = useSelector((state) => state.filters)
  const { filtered_products: products, grid_view } = filters

  if (products.length < 1) {
    return <h5 style={{ textTransform: 'none' }}>Sorry,no products</h5>
  }
  if (grid_view === false) {
    return <ListView products={products} />
  }
  return <GridView products={products}>product list</GridView>
}

export default ProductList
