import React from 'react';
import { connect } from 'react-redux';
import Nav from '../components/nav/Nav';
import { updateNav } from '../actions';

const NavContainer = (props) => {
  return <Nav {...props} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: text => dispatch(updateNav(text)),
  };
};
const mapStateToProps = (state) => {
  return {
    navText: state.nav.navText,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
