/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      posts: [],
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            posts: result,
          });
        },
      );
  }

  handleAbout() {
    this.setState({
      page: 'about',
    });
  }

  handleHome() {
    this.setState({
      page: 'home',
    });
  }

  handleSingle(id) {
    this.setState({
      page: id,
    });
  }

  render() {
    const { posts, page } = this.state;
    let viewPage;
    if (page === 'about') {
      viewPage = (
        <div>
          <p>About</p>
          <div className="content">Hi there, Im about page!</div>
        </div>
      );
    } else if (page === 'home') {
      viewPage = (
        <div>
          <p>Blog Posts</p>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <div className="title">{post.title}</div>
                <div>{post.body}</div>
                <button className="common_button" type="button" onClick={() => (this.handleSingle(post.id))}>See More</button>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      viewPage = (
        posts.filter(post => post.id === page)
          .map(post => (
            <div key={post.id}>
              <p>{post.title}</p>
              <div className="content">{post.body}</div>
              <button className="common_button" type="button" onClick={() => (this.handleHome())}>Back to Homepage</button>
            </div>
          ))
      );
    }

    return (
      <div>
        <div className="nav_bar">
          <h2>Blog</h2>
          <nav>
            <button type="button" onClick={() => (this.handleHome())}>Home</button>
            <button type="button" onClick={() => (this.handleAbout())}>About</button>
          </nav>
        </div>
        <div className="container">{viewPage}</div>
      </div>
    );
  }
}
export default App;
