import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../components/home/Home';
import * as actions from '../actions';

const HomeContainer = (props) => {
  return <Home {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostList: () => {
      dispatch(actions.getPostList());
    },
    getImgsList: page => {
      dispatch(actions.getImgsList(page));
    },
    initImgs: array => {
      dispatch(actions.initImgs(array));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    isLoadingGetPosts: state.posts.isLoadingGetPosts,
    isLoadingGetImgs: state.posts.isLoadingGetImgs,
    posts: state.posts.posts,
    imgs: state.posts.imgs,
    totalPage: state.posts.totalPage,
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));
