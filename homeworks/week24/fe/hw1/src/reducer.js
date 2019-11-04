import * as actionTypes from './actionTypes';

const state = {
  navText: '/',
  invalidInput: [],
  author: '',
  title: '',
  body: '',
  imgs: [],
  isLoadingGetImgs: false,
  posts: [],
  isLoadingGetPosts: false,
  totalPage: '',
  singlePost: [],
  isLoadingSinglePost: false,
  isLoadingUpdatePost: false,
  isLoadingDeletePost: false,
  isLoadingCreatePost: false,
};

function reducer(globalState = state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_NAV:
      return {
        ...globalState,
        navText: action.value,
      };
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
    case actionTypes.INIT_IMGS:
      return {
        ...globalState,
        imgs: action.value,
      };
    case actionTypes.GET_IMGS_PENDING:
      return {
        ...globalState,
        isLoadingGetImgs: true,
      };
    case actionTypes.GET_IMGS_FULFILLED:
      return {
        ...globalState,
        isLoadingGetImgs: false,
        imgs: globalState.imgs.concat(action.payload.data),
      };
    case actionTypes.GET_POSTS_PENDING:
      return {
        ...globalState,
        isLoadingGetPosts: true,
      };
    case actionTypes.GET_POSTS_FULFILLED:
      return {
        ...globalState,
        isLoadingGetPosts: false,
        posts: action.payload.data,
        totalPage: Math.ceil(action.payload.data.length / 9),
      };
    case actionTypes.GET_SINGLE_POST_PENDING:
      return {
        ...globalState,
        isLoadingSinglePost: true,
      };
    case actionTypes.GET_SINGLE_POST_FULFILLED:
      return {
        ...globalState,
        isLoadingSinglePost: false,
        singlePost: action.payload.data,
        author: action.payload.data.author,
        title: action.payload.data.title,
        body: action.payload.data.body,
      };
    case actionTypes.GET_UPDATE_POST_PENDING:
      return {
        ...globalState,
        isLoadingUpdatePost: true,
      };
    case actionTypes.GET_UPDATE_POST_FULFILLED:
      return {
        ...globalState,
        isLoadingUpdatePost: false,
      };
    case actionTypes.GET_DELETE_POST_PENDING:
      return {
        ...globalState,
        isLoadingDeletePost: true,
      };
    case actionTypes.GET_DELETE_POST_FULFILLED:
      return {
        ...globalState,
        isLoadingDeletePost: false,
      };
    case actionTypes.GET_CREATE_POST_PENDING:
      return {
        ...globalState,
        isLoadingCreatePost: true,
      };
    case actionTypes.GET_CREATE_POST_FULFILLED:
      return {
        ...globalState,
        isLoadingCreatePost: false,
      };
    default:
      return globalState;
  }
}

export default reducer;
