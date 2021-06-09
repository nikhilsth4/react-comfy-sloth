import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  PrivateRoute,
  AuthWrapper,
} from './pages'

function App() {
  const cart_items = useSelector((state) => state.cart.cart_items)
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart_items))
  }, [cart_items])
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/products' component={Products} />
          <Route exact path='/products/:id' component={SingleProduct} />
          <PrivateRoute exact path='/checkout' component={Checkout} />
          <Route path='*' component={Error} />
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App
