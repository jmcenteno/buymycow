import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { fromJS } from 'immutable';

import rootReducer from './reducers';

let store;
const isProduction = process.env.NODE_ENV === 'production';
const middleware = [thunk];

if (!isProduction) {
  middleware.push(logger);
}

function isStoreInitialized() {

  if (!store) {
    return false;
  }

  return true;

}

export function configureStore() {

  const preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;

  const enhancer = compose(applyMiddleware(...middleware));
  
  // Create Redux store with initial state
  store = createStore(rootReducer, fromJS(preloadedState), enhancer);

  return store;

}

export function dispatch(action) {

  if (!isStoreInitialized()) {
    return null;
  }

  return store.dispatch(action);

}

export function getState() {

  if (!isStoreInitialized()) {
    return null;
  }

  return store.getState();

}
