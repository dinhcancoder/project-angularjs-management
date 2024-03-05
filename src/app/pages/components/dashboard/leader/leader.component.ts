import { ApiService } from './../../../../services/api.service';
import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css'],
})
export class LeaderComponent implements OnInit {
  countEmployee: number = 0;
  listEmployee: Employee[] = [];
  employeeProfile: any;
  username: string = '';
  roleID: number = 0;

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authService.getListEmployee().subscribe((res) => {
      this.listEmployee = res.data;
      this.countEmployee = res.data.length;
    });
    this.authService.getProfile().subscribe((profile) => {
      this.employeeProfile = profile;
    });
  }

  handleSearchEmployee() {
    this.employeeService
      .searchEmployees(this.username, this.roleID)
      .subscribe((res) => {
        this.listEmployee = res.data;
      });
  }
}
