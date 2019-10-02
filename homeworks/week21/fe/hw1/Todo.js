/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.mark = this.mark.bind(this);
    this.editing = this.editing.bind(this);
    this.update = this.update.bind(this);
  }

  delete() {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  }

  mark() {
    const { todo, markTodo } = this.props;
    markTodo(todo.id);
  }

  editing() {
    const { todo, handleMode } = this.props;
    handleMode(todo.id); // 把這個 todo 的 id 傳過去更改編輯狀態
  }

  update() {
    const { todo, updateContent } = this.props;
    updateContent(todo.id); // 把這個 todo 的 id 傳過去更改內文與編輯狀態
  }

  render() {
    const { todo, textChange, editText } = this.props;
    if (todo.editing === false) {
      return (
        <div className="todo_item todo_default">
          <button
            className={`icon ${todo.done === false ? 'icon_check' : 'icon_checked'}`}
            type="button"
            onClick={this.mark}
          />
          <p className="txt">{todo.text}</p>
          <button className="icon icon_edit" type="button" onClick={this.editing} />
          <button className="icon icon_delete" type="button" onClick={this.delete} />
        </div>
      );
    }
    return (
      <div className="todo_item todo_edit">
        <input className="edit_input" value={editText} onChange={textChange} />
        <div className="controller">
          <button className="btn_cancel" type="button" onClick={this.editing}>取消</button>
          <button className="btn_update" type="submit" onClick={this.update}>變更</button>
        </div>
      </div>
    );
  }
}
export default Todo;
