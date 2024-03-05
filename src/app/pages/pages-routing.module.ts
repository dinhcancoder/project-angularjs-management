import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { LoginGuard } from '../shared/login.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'project',
        loadChildren: () =>
          import('./components/project/project.module').then(
            (m) => m.ProjectModule
          ),
      },
      {
        path: 'task',
        loadChildren: () =>
          import('./components/task/task.module').then((m) => m.TaskModule),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./components/employee/employee.module').then(
            (m) => m.EmployeeModule
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
