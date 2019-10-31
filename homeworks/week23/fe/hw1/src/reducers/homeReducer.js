import * as actionTypes from '../actionTypes';

const state = {
  imgs: [],
};

function homeReducer(globalState = state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_IMGS:
      return {
        ...globalState,
        imgs: globalState.imgs.concat(action.value),
      };
    default:
      return globalState;
  }
}

export default homeReducer;
