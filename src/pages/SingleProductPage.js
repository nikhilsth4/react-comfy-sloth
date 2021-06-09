import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useParams, useHistory } from 'react-router-dom'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { fetchSingleProduct } from '../redux/products/products.action'

const SingleProductPage = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product,
  } = products

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [id])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push('/')
      }, 3000)
    }
  }, [error])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    company,
    images,
    id: sku,
  } = single_product
  return (
    <Wrapper>
      <PageHero title={name} product={true} />
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          Back to Products
        </Link>
        <div className='product-center'>
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Available : </span>
              {stock > 0 ? 'In Stock' : 'out of stock'}
            </p>
            <p className='info'>
              <span>SKU : </span>
              {sku}
            </p>
            <p className='info'>
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={single_product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
