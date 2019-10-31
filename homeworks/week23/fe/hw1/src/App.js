/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* jsx-a11y/no-static-element-interactions */
import React from 'react';
import './style.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './containers/NavContainer';
import About from './components/about/About';
import Home from './containers/HomeContainer';
import SinglePage from './containers/SinglePageContainer';
import AddPost from './containers/AddPostContainer';

const App = () => (
  <Router>
    <div>
      <div className="nav_bar">
        <h2>Blog</h2>
        <Nav />
        <div className="clearfix" />
      </div>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/posts/:postId" render={() => <SinglePage />} />
        <Route path="/addPost" component={AddPost} />
        <Route path="/edit/:postId" render={() => <SinglePage editing />} />
      </div>
    </div>
  </Router>
);
export default App;
