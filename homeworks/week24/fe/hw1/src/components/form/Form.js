
/* jsx-a11y/no-static-element-interactions */

import React, { Component, Fragment } from 'react';
import './Form.css';

const Field = (props) => {
  const { fieldName, inputTitle, handleInputChange, checkValid, errTxt, name } = props;
  return (
    <div>
      <div className="input_title">{fieldName === '' ? '' : inputTitle}</div>
      { name !== 'body' ? (
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

  handleInputChange = (e) => {
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

  // 根據 invalidInput 決定內容位空的選項要出現什麼 警語和樣式
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
          handleInputChange={this.handleInputChange}
          errTxt="Author should not be empty"
          checkValid={this.checkValid}
        />
        <Field
          inputTitle="Title"
          fieldName={title}
          name="title"
          handleInputChange={this.handleInputChange}
          errTxt="Title should not be empty"
          checkValid={this.checkValid}
        />
        <Field
          inputTitle="Some Cool Text"
          fieldName={body}
          name="body"
          handleInputChange={this.handleInputChange}
          errTxt="Text should not be empty"
          checkValid={this.checkValid}
        />
      </Fragment>
    );
  }
}
export default Form;
