import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isShowProfile: boolean = false;
  employeeProfile: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile) => {
      this.employeeProfile = profile.data;
    });
  }

  logout() {
    this.authService.logout();
  }

  showProfile() {
    this.isShowProfile = !this.isShowProfile;
  }
}
