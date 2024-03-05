import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { AuthService } from 'src/app/services/auth.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeProfile: any;
  listProject: Project[] = [];

  constructor(
    private authService: AuthService,
    private decimalPipe: DecimalPipe
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile) => {
      this.employeeProfile = profile.data;
      this.listProject = profile.data.projectData;
    });
  }

  // Fomat số
  formattedNumber(num: number): string {
    return this.decimalPipe.transform(num, '1.0-3') || '';
  }
}
