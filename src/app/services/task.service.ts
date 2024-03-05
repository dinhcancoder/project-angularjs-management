import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private apiService: ApiService) {}

  fetchAllTask() {
    return this.apiService.getData('task');
  }

  fetchAllTaskByEmployeeID(employeeID: number) {
    return this.apiService.getData(`task/${employeeID}`);
  }

  addNewTask(data: Task) {
    return this.apiService.postData('task', data);
  }

  deleteTask(id: number) {
    return this.apiService.deleteData('task', id);
  }

  findTaskByID(id: number) {
    return this.apiService.getData(`task/find/${id}`);
  }
}
