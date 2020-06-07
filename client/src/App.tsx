/// <reference path="./interfaces.d.ts"/>
import React from 'react';
import { TodoApi } from './services/Api'
import './assets/style/App.css'
import TodoItem from './components/TodoItem';
import checkAll from './assets/img/down-arrow.svg'
import * as ReactDOM from "react-dom";
import classNames from "classnames";
import { TodoFooter } from "./components/Footer"
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants/config';

class App extends React.Component<ITodoAppProps, ITodoAppState> implements ITodoApp {
  public state: ITodoAppState;
  private isCheckAll = false;
  private newTodoRef = React.createRef<HTMLInputElement>()

  constructor(props: ITodoAppState) {
    super(props);
    this.state = {
      todoItems: [],
      nowShowing: ALL_TODOS
    }
  }

  public async componentDidMount() {
    await this.getAll();
    this.checkAllComplete(this.state.todoItems);
  }

  public async getAll() {
    await TodoApi.getList().then(data => {
      this.setState(
        { todoItems: [...data] }
      )
    })
  }

  public checkAllComplete(todoItems: Array<ITodoItem>) {
    let isCheckAll = todoItems.find((item: any) => item.isCompleted === false)
    isCheckAll === undefined ? this.isCheckAll = true : this.isCheckAll = false;
    this.forceUpdate()
    console.log(this.isCheckAll, 29392394)
  }

  public handleNewTodoKeyDown(event: React.KeyboardEvent) {
    if (event.keyCode !== 13) {
      return;
    }

    event.preventDefault();

    const node = this.newTodoRef.current
    let val = (ReactDOM.findDOMNode(node) as HTMLInputElement).value.trim();
    if (val) {
      this.addTodoItem(val);
      (ReactDOM.findDOMNode(node) as HTMLInputElement).value = '';
    }
  }

  public addTodoItem(val: string) {
    let newTodoItem = {
      title: val,
      isCompleted: false
    }
    TodoApi.addItem(newTodoItem);
    this.setState({
      todoItems: [
        ...this.state.todoItems,
        newTodoItem
      ]
    })
  }

  public toggle(item: ITodoItem, ) {
    const isCompleted = item.isCompleted;
    const index = this.state.todoItems.indexOf(item);
    const { todoItems } = this.state;
    todoItems[index].isCompleted = !isCompleted;
    this.checkAllComplete(todoItems);
    this.setState({
      todoItems: todoItems
    });
  }

  public async toggleAll() {
    this.isCheckAll = !this.isCheckAll;
    let that = this;
    let todoItems = this.state.todoItems.map((item: ITodoItem) => {
      item.isCompleted = that.isCheckAll;
      return item;
    })
    this.setState({
      todoItems: [
        ...todoItems
      ]
    })
    todoItems.forEach(item => {
      TodoApi.updateItem(item)
    })
  }

  public destroy(item: any) {
    let todoItems = this.state.todoItems.filter(function (candidate: ITodoItem) {
      return candidate !== item;
    });
    TodoApi.deleteItem(item._id);
    this.setState({
      todoItems: [
        ...todoItems
      ]
    })
  }

  public clearCompleted() {
    this.isCheckAll = false
    let todoItems = this.state.todoItems.filter(function (todo: ITodoItem) {
      return !todo.isCompleted;
    });
    this.setState({
      todoItems: [
        ...todoItems
      ]
    })
    todoItems.forEach(item => {
      TodoApi.updateItem(item)
    })
  }

  public changeShowing(nowShowing: string) {
    this.setState({
      nowShowing: nowShowing
    })
  }
  public render() {
    const todos = this.state.todoItems;
    let main;
    let footer;

    var shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
      case ACTIVE_TODOS:
        return !todo.isCompleted;
      case COMPLETED_TODOS:
        return todo.isCompleted;
      default:
        return true;
      }
    });

    var todoItems = shownTodos.map((todo, index: number) => {
      return (
        <TodoItem
          key={index}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
        />
      );
    });
    
    if (todos.length) {
      main = <ul className="ul-todos">{todoItems}</ul>
    }

    let activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.isCompleted ? accum : accum + 1;
    }, 0);

    var completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.clearCompleted.bind(this)}
          onChangeShowing={this.changeShowing.bind(this)}
        />;
    }

    return (
      <div className="App">
        <h1 className="text-title">Todos App</h1>
        <section className="main">
          <div className="todo-content">
            <header>
              <img className={classNames({ complete: this.isCheckAll })} src={checkAll} alt="" onClick={this.toggleAll.bind(this)} />
              <input
                ref={this.newTodoRef}
                placeholder="What needs to be done"
                type="text"
                onKeyDown={e => this.handleNewTodoKeyDown(e)}
                autoFocus={true}
              />
            </header>
            {main}
            {footer}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
