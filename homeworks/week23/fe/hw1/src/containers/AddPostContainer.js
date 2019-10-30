/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddPost from '../components/addPost/AddPost';
import { fieldInvalid, fieldAuthor, fieldBody, fieldTitle } from '../actions';

const AddPostContainer = (props) => {
  return <AddPost {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fieldInvalid: array => dispatch(fieldInvalid(array)),
    fieldAuthor: text => dispatch(fieldAuthor(text)),
    fieldTitle: text => dispatch(fieldTitle(text)),
    fieldBody: text => dispatch(fieldBody(text)),
  };
};
const mapStateToProps = (state) => {
  return {
    invalidInput: state.fields.invalidInput,
    author: state.fields.author,
    title: state.fields.title,
    body: state.fields.body,
  };
};
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(AddPostContainer)));
