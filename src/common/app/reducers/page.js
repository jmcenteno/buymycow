import { Map } from 'immutable';

import { PAGE_TITLE } from '../actions/page';

const initialState = Map({
  title: ''
});

const actionsMap = {

  [PAGE_TITLE]: (state, action) => {
    return state.merge({
      title: action.data
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
