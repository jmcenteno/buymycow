import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';

let store;
const isProduction = process.env.NODE_ENV === 'production';

function isStoreInitialized() {

  if (!store) {
    return false;
  }

  return true;

}

export function configureStore(initialState, history = null) {
  
  const middleware = [thunk];
  
  if (!isProduction) {
    middleware.push(createLogger());
  }

  if (history) {
    middleware.push(routerMiddleware(history));
  }

  // Add universal enhancers here
  let enhancers = [];

  const composeEnhancers = (
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;

  const enhancer = composeEnhancers(...[applyMiddleware(...middleware), ...enhancers]);

  // create store with enhancers, middleware, reducers, and initialState
  store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

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
