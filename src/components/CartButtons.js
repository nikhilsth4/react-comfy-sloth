import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { closeSideBar } from '../redux/products/products.action'
import { clearCart, countCartTotals } from '../redux/cart/cart.action'
import { useAuth0 } from '@auth0/auth0-react'

const CartButtons = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  useEffect(() => {
    dispatch(countCartTotals())
    // eslint-disable-next-line
  }, [cart.cart_items])

  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link
        to='/cart'
        className='cart-btn'
        onClick={() => dispatch(closeSideBar())}
      >
        Cart{' '}
        <span className='cart-container'>
          <FaShoppingCart />
          <span className='cart-value'>{cart.total_items}</span>
        </span>{' '}
      </Link>
      {isAuthenticated ? (
        <button
          type='button'
          className='auth-btn'
          onClick={() => {
            logout({ returnTo: window.location.origin })
            dispatch(clearCart())
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button
          type='button'
          className='auth-btn'
          onClick={() => loginWithRedirect()}
        >
          Login <FaUserPlus />
        </button>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButtons
