import React, { Component } from 'react';
import './css/bootstrap.css';
import './css/all.css';
import './css/pretty-checkbox.min.css';
import './css/common.css';
const $ = $ || document.querySelector.bind(document);

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  Todo(todo) {
    return {
      todo: todo,
      isCompleted: false
    };
  }

  handleClick() {
    const todoList = this.state.todoList.slice();
    todoList.push(this.Todo($('#todoTxt').value));
    this.setState({todoList: todoList});
    console.dir(todoList);
    $('#todoTxt').value = '';
  }

  handleKeyPress(e) {
    if(e.key === 'Enter') {
      this.handleClick();
    }
  }

  handleCheckboxClick(idx) {
    const todoList = this.state.todoList.slice()
    todoList[idx].isCompleted = true;
    this.setState({todoList: todoList});
  }

  render() {
    const orderedTodoList = this.state.todoList.sort((ele) => ele.isCompleted !== true);

    return (
      <div className="row h-100">
        <div className="nav h-100 col-sm-3">
          <div className="history-header"><i className="fas fa-history"></i>&nbsp;&nbsp;History</div>
        </div>
        <div className="content col-sm-9">

          <div className="input-group mb-3 input-todo">
            <div className="input-group-prepend">
              <span className="input-group-text text-white" onClick={this.handleClick}>
                <i className="fas fa-plus"></i>
              </span>
            </div>
            <input id="todoTxt" type="text" className="form-control text-white" placeholder="할 일 추가..." onKeyPress={this.handleKeyPress}/>
          </div>

          <div className="todo-list list-group">
            {
              orderedTodoList.map((ele, i) => {
                return <Todo key={i} idx={i} todo={ele.todo} isCompleted={ele.isCompleted} handleCheckboxClick={this.handleCheckboxClick}/>
              })
            }
          </div>

        </div>
      </div>
    );
  }
}

class Todo extends Component {
  render() {
    return (
      <div className="input-group">

        <div className="input-group-prepend">
          <div className="input-group-text">
            <div className="pretty p-default p-curve p-fill">
              <input type="checkbox" onClick={() => this.props.handleCheckboxClick(this.props.idx)}/>
              <div className="state">
                <label></label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-control bg-white">
          <div className={this.props.isCompleted ? "clip-area completed" : 'clip-area'}>
            {this.props.todo}
            <div className="float-right">
              <i className="far fa-star"></i>
            </div>
            <div className="float-right">
              <i className="fas fa-thumbtack"></i>
            </div>
          </div>
        </div>

      </div>
    );

  }
}

export default App;
