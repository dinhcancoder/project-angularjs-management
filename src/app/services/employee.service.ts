import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apiService: ApiService) {}

  fetchAllEmployee() {
    return this.apiService.getData('account');
  }

  employeesNotInProject(projectID: number) {
    return this.apiService.getData(
      `employeeProject/employeesNotInProject/${projectID}`
    );
  }

  searchEmployees(username: string, roleID: number) {
    return this.apiService.postData(`account/search`, { username, roleID });
  }
}
