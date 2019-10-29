/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable object-curly-newline */
/* jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import './AddPost.css';
import Form from '../../containers/FormContainer';
import { createPost } from '../../WebAPI';

class AddPost extends Component {
  constructor(props) {
    super(props);
    const { fieldInvalid, fieldAuthor, fieldBody, fieldTitle } = this.props;
    fieldInvalid([]);
    fieldAuthor('');
    fieldBody('');
    fieldTitle('');
  }

  handleSubmit(e) {
    const { history, author, title, body, fieldInvalid } = this.props;
    const newState = {
      author,
      title,
      body,
    };
    e.preventDefault();
    if (title && author && body !== '') {
      createPost({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newState),
      })
        .then(res => res.json())
        .then(() => {
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const invalid = [];
      Object.entries(newState).forEach(([key, value]) => {
        if (value === '') {
          invalid.push(key);
        }
      });
      fieldInvalid(invalid);
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Add Post</h3>
        <form className="post_container">
          <Form />
          <button type="submit" className="common_button mid_button" onClick={(e) => { this.handleSubmit(e); }}>Submit</button>
        </form>
      </div>
    );
  }
}
export default AddPost;
