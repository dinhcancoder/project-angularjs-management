import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { Task } from 'src/app/models/task';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  projectID: number = 0;
  listProject: Project[] = [];
  listEmployee: Employee[] = [];
  listTask: Task[] = [];
  employeeProfile: any;

  initialTask = {
    id: 0,
    name: '',
    description: '',
    status: 'Not Started',
    priority: 'Low',
    projectID: 0,
    employeeID: 0,
    progress: 0,
    employeeData: {
      username: '',
      avatar: '',
      roleID: 0,
    },
  };

  taskProgress: any = {
    'Not Started': 0,
    'In Progress': 25,
    'Partially Completed': 50,
    'Almost Completed': 75,
    Completed: 100,
  };

  formDataTask: Task = this.initialTask;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile) => {
      this.listProject = profile.data.projectData;
    });

    this.taskService.fetchAllTask().subscribe((res) => {
      this.listTask = res.data;
    });

    this.authService.getProfile().subscribe((profile) => {
      this.employeeProfile = profile.data;
    });
  }

  // Thêm task
  handleAddTask() {
    this.formDataTask.progress = this.taskProgress[this.formDataTask.status];
    this.taskService.addNewTask(this.formDataTask).subscribe(() => {
      this.taskService.fetchAllTask().subscribe((res) => {
        this.listTask = res.data;
      });
    });
  }

  // Project nhân viên đã tham gia
  getEmployeesByProjectID() {
    this.projectService
      .getEmployeesByProjectID(this.projectID)
      .subscribe((res) => {
        this.listEmployee = res.data.employeeData;
        this.listEmployee = res.data.employeeData.filter(
          (employee: any) => employee.roleID === 1
        );
      });
  }

  // Xóa task
  handleDeleteTask(id: number) {
    if (window.confirm(`confirm delete task`)) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.taskService.fetchAllTask().subscribe((res) => {
          this.listTask = res.data;
        });
      });
    }
  }
}
