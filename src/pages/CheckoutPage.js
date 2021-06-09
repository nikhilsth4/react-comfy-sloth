import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart)

  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
        {cart.cart_items.length < 1 ? (
          <div className='empty'>
            <h2>Your cart is empty</h2>
            <Link to='/products' className='btn'>
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`
export default CheckoutPage
