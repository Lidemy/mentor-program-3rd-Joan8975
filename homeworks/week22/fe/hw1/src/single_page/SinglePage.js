/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

import React, { Component, Fragment } from 'react';
import './SinglePage.css';
import { Link } from 'react-router-dom';

class SinglePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      imgs: 'https://is.gd/YvDcYD',
    };
  }

  componentDidMount() {
    const {
      match: {
        params: {
          postId,
        },
      },
    } = this.props;

    fetch(`https://qootest.com/posts/${postId}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            post: result,
          });
        },
      );

    fetch('https://api.unsplash.com/photos/?client_id=773741e75ba8c52b7d3d825cd4c33cf637a1f77a7fe0f64109e4f5bdd35e22ad&per_page=30&order_by=popular')
      .then(res => res.json())
      .then(
        (result) => {
          const {
            location: {
              hash,
            },
          } = this.props;
          const id = hash.slice(1);

          this.setState({
            imgs: result[id].urls.regular,
          });
        },
      );
  }

  render() {
    const { post, imgs } = this.state;
    const {
      location: {
        hash,
      },
    } = this.props;
    const id = hash.slice(1);

    return (
      <Fragment>
        <div className="title_group">
          <div className="subtitle">{`${post.author} | ${post.createdAt}`}</div>
          <div className="article_title">{post.title}</div>
        </div>
        {id < 30 ? <img className="article_img" src={imgs} alt="" /> : <img className="article_img" src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80" alt="" />}
        <div key={post.id} className="article_container">
          <div className="article_content">{post.body}</div>
          <Link className="common_button" to="/">Back</Link>
        </div>
      </Fragment>
    );
  }
}
export default SinglePage;
