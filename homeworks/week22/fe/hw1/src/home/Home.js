/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

import React, { Component, Fragment } from 'react';
import '../style.css';
import { withRouter } from 'react-router-dom'; // higher older component


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      imgs: [],
    };
  }

  componentDidMount() {
    fetch('https://qootest.com/posts/?_sort=id&_order=desc')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            posts: result,
          });
        },
      );
    // unsplash api
    fetch('https://api.unsplash.com/photos/?client_id=773741e75ba8c52b7d3d825cd4c33cf637a1f77a7fe0f64109e4f5bdd35e22ad&per_page=30&order_by=popular')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            imgs: result,
          });
        },
      );
  }

  render() {
    const { posts, imgs } = this.state;
    const { history } = this.props;
    return (
      <div className="container">
        <h3>Blog Posts</h3>
        <ul>
          {posts.map((post, arr) => (
            <Fragment key={post.id}>
              <li role="presentation" onClick={() => history.push(`/posts/${post.id}#${arr}`)}>
                <div className="preview">
                  {arr < 30 ? <img src={imgs[arr].urls.regular} alt="" /> : <img src="https://reurl.cc/drDEp6" alt="" />}
                </div>
                <div className="title">{post.title}</div>
                <div className="content">{post.body}</div>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(Home);
