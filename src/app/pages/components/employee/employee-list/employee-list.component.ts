import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  listEmployee: Employee[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getListEmployee().subscribe((res) => {
      this.listEmployee = res.data;
    });
  }
}
