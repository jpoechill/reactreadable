import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import { applyMiddleware, createStore } from "redux";
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware)

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  ), document.getElementById('root'));
