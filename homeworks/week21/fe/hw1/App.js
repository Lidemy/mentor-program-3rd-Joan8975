/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './style.css';
import Todo from './Todo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputText: '',
      editText: '',
    };
    this.id = 1;
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.markTodo = this.markTodo.bind(this);
    this.handleMode = this.handleMode.bind(this);
    this.textChange = this.textChange.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    const todoData = window.localStorage.getItem('todoapp');
    if (todoData) {
      const oldTodos = JSON.parse(todoData);
      this.setState({
        todos: oldTodos,
      });
      this.id = oldTodos[oldTodos.length - 1].id + 1;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      window.localStorage.setItem('todoapp', JSON.stringify(todos));
    }
  }

  handleChange(e) {
    this.setState({
      inputText: e.target.value,
    });
  }

  handleMode(id) {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          editing: !todo.editing, // 傳入的這個 id 的 todo 狀態改為編輯模式
        };
      }),
    });
  }

  addTodo() {
    const { inputText, todos } = this.state;
    this.setState({
      todos: [...todos, {
        id: this.id,
        done: false,
        text: inputText,
        editing: false, // 這個 todo 是不是編輯狀態
      }],
      inputText: '',
    });
    this.id += 1;
  }

  deleteTodo(id) {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id),
    });
  }

  markTodo(id) {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          done: !todo.done,
        };
      }),
    });
  }

  textChange(e) {
    this.setState({
      editText: e.target.value,
    });
  }

  updateContent(id) {
    const { editText, todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          text: editText,
          editing: !todo.editing,
        };
      }),
      editText: '',
    });
  }

  render() {
    const { todos, inputText } = this.state;
    return (
      <div>
        <div className="contain">
          <div className="input_bar">
            <input type="text" className="add_input" value={inputText} onChange={this.handleChange} />
            <button className="add_btn" type="button" onClick={this.addTodo} />
          </div>
          <ul className="todo_group">
            {todos.map(
              todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  deleteTodo={this.deleteTodo}
                  markTodo={this.markTodo}
                  handleMode={this.handleMode}
                  updateContent={this.updateContent}
                  textChange={this.textChange}
                />
              ),
            )}
          </ul>
        </div>
      </div>
    );
  }
}
export default App;
