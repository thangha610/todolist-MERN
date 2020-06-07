import { Request, Response } from "express";
import { WELCOME_MESSAGE } from "../constants/TodoAPIConstants";
import { TodoItem } from "../models/TodoModel"
import { MongooseDocument } from "mongoose";
import { CRUD } from '../abstract/CrudClass';


class TodoService extends CRUD{
  constructor(model: any) {
    super(model);
  }

  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send(WELCOME_MESSAGE);
  }
}

let TodoItemService = new TodoService(TodoItem);

export {TodoItemService};