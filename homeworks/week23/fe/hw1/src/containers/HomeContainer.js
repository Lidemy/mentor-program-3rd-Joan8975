/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../components/home/Home';
import { updateImgs } from '../actions';

const HomeContainer = (props) => {
  return <Home {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateImgs: array => dispatch(updateImgs(array)),
  };
};
const mapStateToProps = (state) => {
  return {
    imgs: state.images.imgs,
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));
