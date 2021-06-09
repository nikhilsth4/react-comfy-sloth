import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import { store } from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
)
