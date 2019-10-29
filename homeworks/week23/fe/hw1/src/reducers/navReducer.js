import * as actionTypes from '../actionTypes';

const state = {
  navText: '/',
};

function navReducer(globalState = state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_NAV:
      return {
        ...globalState,
        navText: action.value,
      };
    default:
      return globalState;
  }
}

export default navReducer;
