import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Controller } from './TodoController';
import mongoose from 'mongoose';
import { MONGO_URL } from './constants/TodoAPIConstants';

class App {
  public app: Application;
  public todoController: Controller;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.todoController = new Controller(this.app)
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended:true}));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise

    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log("DB Connection Error:", err.message);
    });
  }
}

export default new App().app;