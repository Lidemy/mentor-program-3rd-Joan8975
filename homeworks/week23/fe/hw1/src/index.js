/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import App from './App';
import navReducer from './reducers/navReducer';
import fieldReducer from './reducers/fieldsReducer';
import homeReducer from './reducers/homeReducer';

const reducers = combineReducers({
  nav: navReducer,
  fields: fieldReducer,
  images: homeReducer,
});

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
