/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fieldInvalid, fieldAuthor, fieldBody, fieldTitle, updateImgs } from '../actions';
import SinglePage from '../components/singlePage/SinglePage';

const SinglePageContainer = (props) => {
  return <SinglePage {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fieldInvalid: array => dispatch(fieldInvalid(array)),
    fieldAuthor: text => dispatch(fieldAuthor(text)),
    fieldTitle: text => dispatch(fieldTitle(text)),
    fieldBody: text => dispatch(fieldBody(text)),
    updateImgs: array => dispatch(updateImgs(array)),
  };
};
const mapStateToProps = (state) => {
  return {
    invalidInput: state.fields.invalidInput,
    author: state.fields.author,
    title: state.fields.title,
    body: state.fields.body,
    imgs: state.images.imgs,
  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(SinglePageContainer)));
