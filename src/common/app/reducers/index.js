import { combineReducers }  from 'redux-immutable';

import routing from './routing';
import products from './products';
import productDetails from './productDetails';
import user from './user';
import page from './page';

export const reducers = {
  products,
  productDetails,
  user,
  page
};

export default combineReducers({
  ...reducers,
  routing
});
