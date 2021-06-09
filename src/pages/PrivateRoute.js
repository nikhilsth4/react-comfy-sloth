import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth0()
  {
    return isAuthenticated ? <Route {...rest} /> : <Redirect to='/' />
  }
}
export default PrivateRoute
