import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  Filters,
  ProductList,
  Sort,
  PageHero,
  Loading,
  Error,
} from '../components'
import { loadProducts } from '../redux/filters/filters.action'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  useEffect(() => {
    dispatch(loadProducts)
    // eslint-disable-next-line
  }, [])

  const { products_loading: loading, products_error: error } = products

  if (loading) {
    return (
      <div className='page-100'>
        <Loading />
      </div>
    )
  }
  if (error) {
    return <Error />
  }

  return (
    <main>
      <PageHero title='products' />
      <Wrapper className='page'>
        <div className='section-center products'>
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default ProductsPage
