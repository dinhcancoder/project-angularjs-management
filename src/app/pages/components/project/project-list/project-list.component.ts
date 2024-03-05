import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { getCurrentDate } from 'src/app/utils';

interface ProjectData {
  name: string;
  startDate: string;
  teamSize: number;
  budget: number;
  exprense: number;
  status: string;
  progress: number;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  listProject: Project[] = [];
  listEmployee: Employee[] = [];
  projectID: number = 0;
  employeeID: number = 0;
  employeeCounts: Record<number, number> = {};
  detailProjectData!: Project;
  detailEmployeeData!: Employee[];

  projectProgress: any = {
    Planning: 0,
    Developing: 25,
    Executing: 50,
    Review: 75,
    Completed: 100,
  };

  projectData: ProjectData = {
    name: '',
    startDate: getCurrentDate(),
    teamSize: 0,
    budget: 0,
    exprense: 0,
    status: 'Planning',
    progress: 0,
  };

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.projectService.fetchAllProject().subscribe((res) => {
      this.listProject = res;
    });
  }

  // Fomat số
  formattedNumber(num: number): string {
    return this.decimalPipe.transform(num, '1.0-3') || '';
  }

  // Xóa project
  handleDeleteProject(id: number) {
    if (window.confirm('Confirm delete project!')) {
      this.projectService.deleteProject(id).subscribe((res) => {
        if (res.error === 1) {
          alert(res.message);
        } else {
          this.listProject = this.listProject.filter(
            (project) => project.id !== id
          );
        }
      });
    }
  }

  // Thêm mới project
  handleAddNewProject() {
    this.projectData.progress = this.projectProgress[this.projectData.status];
    this.projectService.addNewProject(this.projectData).subscribe(() => {
      this.projectService.fetchAllProject().subscribe((res) => {
        this.listProject = res;
        this.projectData = {
          name: '',
          startDate: getCurrentDate(),
          teamSize: 0,
          budget: 0,
          exprense: 0,
          status: 'Planning',
          progress: 0,
        };
      });
    });
  }

  // Thêm employee vào project
  handleAddEmployeeForProject() {
    this.projectService
      .addEmployeeForProject(this.projectID, this.employeeID)
      .subscribe((res) => {
        if (res.error === 1) {
          alert(res.message);
        }
        this.projectService.fetchAllProject().subscribe((res) => {
          this.listProject = res;
          this.projectID = 0;
          this.employeeID = 0;
        });
      });
  }

  //
  employeesNotInProject(projectID: number) {
    this.employeeService.employeesNotInProject(projectID).subscribe((res) => {
      this.listEmployee = res.employees;
    });
  }

  detailProject(projectID: number) {
    this.projectService.findOneProject(projectID).subscribe((res) => {
      this.detailEmployeeData = res.employee;
      this.detailProjectData = res.project;
    });
  }
}
