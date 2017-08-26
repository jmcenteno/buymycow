import { Map } from 'immutable';

import { USER_SET } from '../actions/user';

const initialState = Map({
  currentUser: ''
});

const actionsMap = {

  [USER_SET]: (state, action) => {
    return state.merge({
      currentUser: action.data
    });
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
