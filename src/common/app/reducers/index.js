import { combineReducers }  from 'redux-immutable';

import routing from './routing';
import products from './products';
import productDetails from './productDetails';
import user from './user';

export const reducers = {
  products,
  productDetails,
  user
};

export default combineReducers({
  ...reducers,
  routing
});
