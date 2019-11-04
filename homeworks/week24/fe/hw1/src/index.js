/* eslint-disable import/no-duplicates */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import App from './App';
import navReducer from './reducer';
import fieldReducer from './reducer';
import postsReducer from './reducer';

const reducers = combineReducers({
  nav: navReducer,
  fields: fieldReducer,
  posts: postsReducer,
});

const store = createStore(reducers, applyMiddleware(promise));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
