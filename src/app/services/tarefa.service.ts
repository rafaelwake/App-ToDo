import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  taskCollection: any[] = [];
  key = 'taskCollection';
  constructor() {}

  saveTask(task: any, callback: any) {
    task.status = 'Pendente';
    //get info from localstorage
    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      this.taskCollection.push(task);
      localStorage.setItem(this.key, JSON.stringify(this.taskCollection));
    } else {
      let collection: any[] = JSON.parse(value);
      collection.push(task);
      localStorage.setItem(this.key, JSON.stringify(collection));
    }

    if (callback != null) {
      callback();
    }
  }

  showTask() {
    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      return [];
    }
    let collection: any[] = JSON.parse(value);
    return collection;
  }
}
