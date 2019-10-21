/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* jsx-a11y/no-static-element-interactions */
import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';
import Nav from './nav';
import About from './about';
import Home from './home';
import SinglePage from './single_page';

const App = () => (
  <Router>
    <div>
      <div className="nav_bar">
        <h2>Blog</h2>
        <Nav Link={Link} />
      </div>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/posts/:postId" component={SinglePage} />
      </div>
    </div>
  </Router>
);

export default App;
