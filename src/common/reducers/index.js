import { combineReducers }  from 'redux-immutable';

import routing from './routing';
import products from './products';
import productDetails from './productDetails';

export const reducers = {
  products,
  productDetails
};

export default combineReducers({
  ...reducers,
  routing
});
