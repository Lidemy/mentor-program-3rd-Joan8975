/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable object-curly-newline */
/* jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

import React from 'react';
import './EditPost.css';
import { Link, withRouter } from 'react-router-dom';
import Form from '../../containers/FormContainer';


const EditPost = (props) => {
  const { handleUpdate, page, index } = props;
  const {
    match: {
      params: {
        postId,
      },
    },
  } = props;
  return (
    <div className="container">
      <h3>Edit Post</h3>
      <form className="post_container">
        <Form />
        <Link className="common_button left_button" to={`/posts/${postId}#${page}#${index}`}>Cancel</Link>
        <button type="submit" className="common_button right_button" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};
export default withRouter(EditPost);
