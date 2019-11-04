/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-boolean-value */

import React from 'react';
import './Nav.css';
import { Route, Link } from 'react-router-dom';

const MenuLink = ({ label, to, activeOnlyWhenExact, updateNav }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Link className={`tab  ${match ? 'tab_active' : ''}`} to={to} onClick={() => updateNav(to)}>{label}</Link>
    )}
  />
);
const Nav = ({ updateNav }) => (
  <nav>
    <MenuLink to="/addPost" label="＋ Add Post" updateNav={updateNav} />
    <MenuLink activeOnlyWhenExact={true} to="/" label="Home" updateNav={updateNav} />
    <MenuLink to="/about" label="About" updateNav={updateNav} />
  </nav>
);

export default Nav;
