import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const {REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_DOMAIN} = process.env
console.log(process.env.REACT_APP_AUTH0_CLIENT_ID)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider domain={'dev-zhdf3almhfjlozze.us.auth0.com'} clientId={'shS0K7jmSDdqiKJNyuI9ESFQgOOKFki4'} redirectUri={window.location.origin}>
          <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
  

