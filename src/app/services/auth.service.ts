import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService, private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getRole(): number {
    const rolesString = localStorage.getItem('role');
    return rolesString ? JSON.parse(rolesString) : [];
  }

  setRole(role: number): void {
    localStorage.setItem('role', JSON.stringify(role));
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(email: string, password: string) {
    const data = { email, password };
    return this.apiService.postData('account/login', data).pipe(
      tap((res) => {
        if (res.error !== 1) {
          const role = res.employee.roleID;
          const token = res.accessToken;
          this.setRole(role);
          this.setToken(token);
        }
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  getProfile() {
    return this.apiService.getData('account/profile');
  }

  getListEmployee() {
    return this.apiService.getData('account');
  }
}
