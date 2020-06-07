import { Application } from 'express';
import { TodoItemService } from './services/TodoService';

export class Controller {

  constructor(private app: Application) {
    this.routes();
  }

  public routes() {
    this.app.route('/').get(TodoItemService.welcomeMessage);
    this.app.route('/api/todo-list').get(TodoItemService.getAll);
    this.app.route('/api/add-todo').post(TodoItemService.add);
    this.app
      .route("/api/todo/:id")
      .delete(TodoItemService.delete)
      .put(TodoItemService.update)
  }
}