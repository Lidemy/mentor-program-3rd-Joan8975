/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable object-curly-newline */
/* jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-closing-bracket-location */


import React, { Component, Fragment } from 'react';
import './From.css';

const Field = (props) => {
  const { fieldName, inputTitle, handleInputChange, checkValid, errTxt, name } = props;
  return (
    <div>
      <div className="input_title">{fieldName === '' ? '' : inputTitle}</div>
      {name !== 'body' ? (
        <input
          className={checkValid(name, 'input_empt')}
          name={name}
          type="text"
          value={fieldName}
          onChange={handleInputChange}
          placeholder={inputTitle} />)
        : (
          <textarea
            className={checkValid(name, 'input_empt')}
            name={name}
            type="text"
            value={fieldName}
            onChange={handleInputChange}
            placeholder={inputTitle}
          />)}
      <div className="err_txt">{checkValid(name, errTxt)}</div>
    </div>
  );
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.checkValid = this.checkValid.bind(this);
  }

  handleInputChange(e) {
    const { fieldInvalid, fieldAuthor, fieldBody, fieldTitle } = this.props;
    fieldInvalid([]);
    switch (e.target.name) {
      case 'author':
        return fieldAuthor(e.target.value);
      case 'title':
        return fieldTitle(e.target.value);
      case 'body':
        return fieldBody(e.target.value);
      default:
        return null;
    }
  }

  checkValid(input, errTxt) {
    const { invalidInput } = this.props;
    return (
      invalidInput.some(item => item === input) ? errTxt : '');
  }

  render() {
    const { author, title, body } = this.props;
    return (
      <Fragment>
        <Field
          inputTitle="Your Name"
          fieldName={author}
          name="author"
          handleInputChange={(e) => { this.handleInputChange(e); }}
          errTxt="Author should not be empty"
          checkValid={this.checkValid}
        />
        <Field
          inputTitle="Title"
          fieldName={title}
          name="title"
          handleInputChange={(e) => { this.handleInputChange(e); }}
          errTxt="Title should not be empty"
          checkValid={this.checkValid}
        />
        <Field
          inputTitle="Some Cool Text"
          fieldName={body}
          name="body"
          handleInputChange={(e) => { this.handleInputChange(e); }}
          errTxt="Text should not be empty"
          checkValid={this.checkValid}
        />
      </Fragment>
    );
  }
}
export default Form;
