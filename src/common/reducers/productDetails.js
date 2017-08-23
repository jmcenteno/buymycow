import { Map, List } from 'immutable';

import {
  PRODUCT_DETAILS_GET_START,
  PRODUCT_DETAILS_GET_ERROR,
  PRODUCT_DETAILS_GET_SUCCESS
} from '../actions/productDetails';

const initialState = Map({
  product: Map({
    loading: false,
    data: null,
    error: null
  }),
  biddingHistory: Map({
    loading: false,
    data: null,
    error: null
  })
});

const actionsMap = {

  [PRODUCT_DETAILS_GET_START]: (state) => {
    console.log('state', state)
    return state.merge({
      product: Object.assign({}, state.get('product').toJS(), {
        loading: true
      })
    });
  },

  [PRODUCT_DETAILS_GET_ERROR]: (state, action) => {
    return state.merge({
      product: Object.assign({}, state.get('product').toJS(), {
        loading: false,
        error: action.data
      })
    });
  },

  [PRODUCT_DETAILS_GET_SUCCESS]: (state, action) => {
    return state.merge({
      product: Object.assign({}, state.get('product').toJS(), {
        loading: false,
        data: action.data,
        error: null
      })
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
