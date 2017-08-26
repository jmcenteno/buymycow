import { Map, List } from 'immutable';

import {
  PRODUCTS_GET_START,
  PRODUCTS_GET_ERROR,
  PRODUCTS_GET_SUCCESS
} from '../actions/products';

const initialState = Map({
  loading: false,
  data: List()
});

const actionsMap = {

  [PRODUCTS_GET_START]: (state) => {
    return state.merge({
      loading: true
    });
  },

  [PRODUCTS_GET_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      error: Map(action.data)
    });
  },

  [PRODUCTS_GET_SUCCESS]: (state, action) => {
    return state.merge({
      loading: false,
      data: List(action.data),
      error: null
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
