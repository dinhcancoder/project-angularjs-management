import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  activeLink: string = 'dashboard';
  employeeProfile: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile) => {
      this.employeeProfile = profile.data;
    });
    this.activeLink = localStorage.getItem('activeLink') || 'dashboard';
  }

  logout() {
    this.authService.logout();
  }

  setActiveLink(link: string) {
    this.activeLink = link;
    localStorage.setItem('activeLink', link);
  }
}
