import { combineReducers }  from 'redux-immutable';

import routing from './routing';
import products from './products';

export const reducers = {
  products
};

export default combineReducers({
  ...reducers,
  routing
});
