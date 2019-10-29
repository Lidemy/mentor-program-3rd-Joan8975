/* eslint-disable arrow-body-style */
import * as actionTypes from './actionTypes';

export const updateNav = (text) => {
  return {
    type: actionTypes.UPDATE_NAV,
    value: text,
  };
};

export const fieldInvalid = (array) => {
  return {
    type: actionTypes.FIELD_INVALID,
    value: array,
  };
};
export const fieldAuthor = (text) => {
  return {
    type: actionTypes.FIELD_AUTHOR,
    value: text,
  };
};
export const fieldTitle = (text) => {
  return {
    type: actionTypes.FIELD_TITLE,
    value: text,
  };
};
export const fieldBody = (text) => {
  return {
    type: actionTypes.FIELD_BODY,
    value: text,
  };
};

export const updateImgs = (array) => {
  return {
    type: actionTypes.UPDATE_IMGS,
    value: array,
  };
};
