import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import { updateFilters, clearFilters } from '../redux/filters/filters.action'

const Filters = () => {
  const filters = useSelector((state) => state.filters)
  const dispatch = useDispatch()
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      max_price,
      price,
      shipping,
    },
    all_products,
  } = filters

  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')
  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='search'
              className='search-input'
              value={text}
              onChange={(e) => dispatch(updateFilters(e))}
            />
          </div>
          <div className='form-control'>
            <h5>Category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) => dispatch(updateFilters(e))}
                    type='button'
                    name='category'
                    className={`${
                      category === c.toLowerCase() ? 'active' : null
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>
          <div className='form-control'>
            <h5>Company</h5>
            <select
              name='company'
              value={company}
              onChange={(e) => dispatch(updateFilters(e))}
              className='company'
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='form-control'>
            <h5>Colors</h5>
            <div className='colors'>
              {colors.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      name='color'
                      className={`${
                        color === 'all' ? 'active all-btn' : 'all-btn'
                      }`}
                      onClick={(e) => dispatch(updateFilters(e))}
                      data-color='all'
                      key={index}
                    >
                      all
                    </button>
                  )
                }
                return (
                  <button
                    key={index}
                    name='color'
                    style={{ background: c }}
                    className={`${
                      color === c ? 'active color-btn' : 'color-btn'
                    }`}
                    onClick={(e) => dispatch(updateFilters(e))}
                    data-color={c}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                )
              })}
            </div>
          </div>

          <div className='form-control'>
            <h5>Price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              onChange={(e) => dispatch(updateFilters(e))}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>

          <div className='form-control shipping'>
            <label htmlFor='shipping'>free Shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              onChange={(e) => dispatch(updateFilters(e))}
              checked={shipping}
            />
          </div>
        </form>
        <button
          type='button'
          className='clear-btn'
          onClick={() => dispatch(clearFilters())}
        >
          Clear Filters
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
