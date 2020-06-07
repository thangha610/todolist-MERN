/// <reference path="../interfaces.d.ts"/>
import axios from 'axios';
import { URL } from '../constants/config'

class Api {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public callApi(method: any, url: string, param?: any) {
        const api = axios.create();
        return api({
            method: method,
            url: url,
            data: param
        }).then(res => {
            return res.data;
        }).catch(error => {
            console.log("Error call api ", url);
        });
    }
    public getList() {
        const url = this.url + 'todo-list';
        const method = 'get'; 
        return this.callApi(method, url)
    }

    public addItem(item: ITodoItem) {
        const url = this.url + 'add-todo';
        const method = 'post'; 
        return this.callApi(method, url, item)
    }

    public deleteItem(id: any){
        const url = this.url + `todo/${id}`
        const method = 'delete';
        return this.callApi(method, url);
    }

    public updateItem(item: any){
        const url = this.url + `todo/${item._id}`;
        const method = 'put';
        return this.callApi(method, url, item);
    }
}

const TodoApi = new Api(URL);

export { TodoApi };