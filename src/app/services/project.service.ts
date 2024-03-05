import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';

interface ProjectData {
  name: string;
  startDate: string;
  teamSize: number;
  budget: number;
  exprense: number;
  status: string;
  progress: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private apiService: ApiService) {}

  fetchAllProject() {
    return this.apiService.getData('project');
  }

  addNewProject(projectData: any) {
    return this.apiService.postData('project', projectData);
  }

  deleteProject(id: number) {
    return this.apiService.deleteData('project', id);
  }

  updateProject(id: number, data: ProjectData) {
    return this.apiService.putData(`project/${id}`, data);
  }

  findOneProject(id: number) {
    return this.apiService.getData(`project/${id}`);
  }

  addEmployeeForProject(projectID: number, employeeID: number) {
    return this.apiService.postData(`employeeProject`, {
      projectID,
      employeeID,
    });
  }

  countEmployeeForProject(projectID: number) {
    return this.apiService.getData(`employeeProject/count/${projectID}`);
  }

  getEmployeesByProjectID(projectID: number) {
    return this.apiService.getData(
      `project/getEmployeesByProjectID/${projectID}`
    );
  }
}
