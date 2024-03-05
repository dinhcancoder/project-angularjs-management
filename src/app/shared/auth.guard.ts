import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ForbiddenPathsForRole1 } from '../constants/role.constants';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authorService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.authorService.isLoggedIn()) {
      const userRole = this.authorService.getRole();
      if (
        userRole === 1 &&
        ForbiddenPathsForRole1.some((forbiddenPath) =>
          state.url.includes(forbiddenPath)
        )
      ) {
        this.router.navigateByUrl('unauthorized');
        return of(false);
      }
      return of(true);
    } else {
      this.router.navigateByUrl('login');
      return of(false);
    }
  }
}
