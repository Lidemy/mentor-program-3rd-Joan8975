/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */

import React from 'react';
import './Nav.css';
import { Route, Link } from 'react-router-dom';

const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Link className={`tab  ${match ? 'tab_active' : ''}`} to={to}>{label}</Link>
    )}
  />
);

const Nav = () => (
  <nav>
    <MenuLink activeOnlyWhenExact={true} to="/" label="Home" />
    <MenuLink to="/about" label="About" />
  </nav>
);

export default Nav;
