import * as actionTypes from '../actionTypes';

const state = {
  invalidInput: [],
  author: '',
  title: '',
  body: '',
};

function fieldsReducer(globalState = state, action) {
  switch (action.type) {
    case actionTypes.FIELD_INVALID:
      return {
        ...globalState,
        invalidInput: action.value,
      };
    case actionTypes.FIELD_AUTHOR:
      return {
        ...globalState,
        author: action.value,
      };
    case actionTypes.FIELD_TITLE:
      return {
        ...globalState,
        title: action.value,
      };
    case actionTypes.FIELD_BODY:
      return {
        ...globalState,
        body: action.value,
      };
    default:
      return globalState;
  }
}

export default fieldsReducer;
