import { Map, List } from 'immutable';

import {
  PRODUCT_DETAILS_GET_START,
  PRODUCT_DETAILS_GET_ERROR,
  PRODUCT_DETAILS_GET_SUCCESS,
  BID_HISTORY_GET_START,
  BID_HISTORY_GET_ERROR,
  BID_HISTORY_GET_SUCCESS,
  BID_CREATE_ERROR,
  BID_CREATE_SUCCESS
} from '../actions/productDetails';

const initialState = Map({
  product: Map({
    loading: false,
    data: null,
    error: null
  }),
  bids: Map({
    loading: false,
    data: List(),
    error: null
  }),
  createBid: Map({
    error: null
  })
});

const actionsMap = {

  [PRODUCT_DETAILS_GET_START]: (state) => {
    return state.merge({
      product: state.get('product').merge({
        loading: true,
        data: null
      })
    });
  },

  [PRODUCT_DETAILS_GET_ERROR]: (state, action) => {
    return state.merge({
      product: state.get('product').merge({
        loading: false,
        error: Map(action.data),
        data: null
      })
    });
  },

  [PRODUCT_DETAILS_GET_SUCCESS]: (state, action) => {
    return state.merge({
      product: state.get('product').merge({
        loading: false,
        error: null,
        data: Map(action.data)
      })
    });
  },

  [BID_HISTORY_GET_START]: (state) => {
    return state.merge({
      bids: state.get('bids').merge({
        loading: true,
        data: List()
      })
    });
  },

  [BID_HISTORY_GET_ERROR]: (state, action) => {
    return state.merge({
      bids: state.get('bids').merge({
        loading: false,
        error: Map(action.data)
      })
    });
  },

  [BID_HISTORY_GET_SUCCESS]: (state, action) => {
    return state.merge({
      bids: state.get('bids').merge({
        loading: false,
        error: null,
        data: List(action.data)
      })
    });
  },

  [BID_CREATE_ERROR]: (state, action) => {
    return state.merge({
      createBid: state.get('bids').merge({
        error: Map(action.data)
      })
    });
  },

  [BID_CREATE_SUCCESS]: (state) => {
    return state.merge({
      createBid: state.get('bids').merge({
        error: null
      })
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
