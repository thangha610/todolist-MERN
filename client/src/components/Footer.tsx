/// <reference path="../interfaces.d.ts"/>

import classNames from "classnames";
import * as React from "react";
import "../assets/style/Footer.css"
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "../constants/config";

class TodoFooter extends React.Component<ITodoFooterProps, {}> {

  public render() {
    var clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      );
    }

    let activeTodoWord = this.props.count > 1 ? 's' : '';
    const nowShowing = this.props.nowShowing;
    console.log(nowShowing,2323)
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> item{ activeTodoWord } left 
        </span>
        <ul className="filters">
          <li onClick={this.props.onChangeShowing.bind(this, ALL_TODOS)}>
            <a
              href="#/"
              className={classNames({selected: nowShowing === ALL_TODOS})}>
                All
            </a>
          </li>
          {' '}
          <li onClick={this.props.onChangeShowing.bind(this, ACTIVE_TODOS)}>
            <a
              href="#/active"
              className={classNames({selected: nowShowing === ACTIVE_TODOS})}>
                Active
            </a>
          </li>
          {' '}
          <li onClick={this.props.onChangeShowing.bind(this, COMPLETED_TODOS)}>
            <a
              href="#/completed"
              className={classNames({selected: nowShowing === COMPLETED_TODOS})}>
                Completed
            </a>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }
}

export { TodoFooter };
