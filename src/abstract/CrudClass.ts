import { Request, Response } from "express";
import { MongooseDocument } from "mongoose";


export abstract class CRUD {
    private model: any;
    constructor(model: any) {
        this.model = model;
        this.getAll = this.getAll.bind(this);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    public getAll(req: Request, res: Response) {
        this.model.find({}, (err: Error, Result: MongooseDocument) => {
            if (err) {
                res.send(err);
            }
            res.json(Result);
        })
    }

    public add(req: Request, res: Response) {
        const newTodoItem = new this.model(req.body);
        console.log('helooooo')
        newTodoItem.save((err: Error, TodoItem: MongooseDocument) => {
            if (err) {
                res.send(err);
            }
            res.json(TodoItem);
        });
    }

    public delete(req: Request, res: Response) {
        const todoItemId = req.params.id;
        this.model.findByIdAndDelete(todoItemId, (err: Error, deleted: any) => {
            if (err) {
                res.send(err);
            }
            const message = deleted ? 'Deleted successfully' : 'Todo item not found :(';
            res.send(message);
        });
    }

    public update(req: Request, res: Response) {
        const todoItemId = req.params.id;
        this.model.findByIdAndUpdate(
            todoItemId,
            req.body,
            (error: Error, todoItem: any) => {
                if (error) {
                    res.send(error);
                }
                const message = todoItem
                    ? 'Updated successfully'
                    : 'Pokemon not found :(';
                res.send(message);
            }
        );
    }
}