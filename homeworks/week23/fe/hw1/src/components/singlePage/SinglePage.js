/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable object-curly-newline */
/* jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable arrow-parens */

import React, { Component, Fragment } from 'react';
import './SinglePage.css';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';
import EditPost from '../editPost/EditPost';
import { getSinglePost, getImgs, updatePost, deletePost } from '../../WebAPI';

class SinglePage extends Component {
  constructor(props) {
    super(props);
    const { editing, fieldInvalid, fieldAuthor, fieldBody, fieldTitle, updateImgs } = this.props;
    this.state = { editing };
    fieldInvalid([]);
    fieldAuthor('');
    fieldBody('');
    fieldTitle('');
    updateImgs([]);
  }

  componentDidMount() {
    const { fieldAuthor, fieldBody, fieldTitle } = this.props;
    const {
      match: {
        params: {
          postId,
        },
      },
    } = this.props;
    getSinglePost(postId)
      .then(res => res.json())
      .then(
        (result) => {
          fieldAuthor(result.author);
          fieldBody(result.body);
          fieldTitle(result.title);
        },
      );
    // 判斷要拿第幾頁的第幾筆 img 資料
    const {
      location: {
        hash,
      },
    } = this.props;
    const res = hash.replace(/#/g, ',').split(',');
    const page = res[1];
    getImgs(page)
      .then(resp => resp.json())
      .then(
        (result) => {
          const { imgs } = this.props;
          Array.prototype.push.apply(imgs, result);
        },
      );
  }

  handleDelete(postId) {
    const { history } = this.props;
    deletePost(postId, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUpdate(e) {
    e.preventDefault();
    const { history, title, author, body, fieldInvalid } = this.props;
    const {
      match: {
        params: {
          postId,
        },
      },
    } = this.props;
    const updateState = {
      title,
      author,
      body,
    };
    if (title && author && body !== '') {
      updatePost(postId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateState),
      })
        .then(res => res.json())
        .then(() => {
          history.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const invalid = [];
      Object.entries(updateState).forEach(([key, value]) => {
        if (value === '') {
          invalid.push(key);
        }
      });
      fieldInvalid(invalid);
    }
  }

  render() {
    const { editing } = this.state;
    const {
      match: {
        params: {
          postId,
        },
      },
    } = this.props;
    const { history, title, author, body, imgs } = this.props;
    const {
      location: {
        hash,
      },
    } = this.props;
    // const index = hash.slice(1);
    const res = hash.replace(/#/g, ',').split(',');
    const page = res[1];
    const index = res[2];
    if (!editing) {
      if (imgs.length) {
        return (
          <Fragment>
            <div className="title_group">
              <div className="subtitle">{author}</div>
              <div className="article_title">{title}</div>
            </div>
            <img className="article_img" src={imgs[index].urls.regular} alt="" />
            <div className="article_container">
              <div className="article_content">{body}</div>
              <div className="btn_controller">
                <Link className="common_button left_button" to="/">Back</Link>
                <button type="submit" className="common_button delete_button " onClick={() => { this.handleDelete(postId); }}>Delete</button>
                <button type="submit" className="common_button " onClick={() => history.push(`/edit/${postId}#${page}#${index}`)}>Edit</button>
              </div>
            </div>
          </Fragment>
        );
      } return <Loading />;
    } return <EditPost page={page} index={index} handleUpdate={(e) => { this.handleUpdate(e); }} />;
  }
}
export default SinglePage;
