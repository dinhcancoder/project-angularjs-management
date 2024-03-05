import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { LeaderComponent } from './components/dashboard/leader/leader.component';
import { EmployeeComponent } from './components/dashboard/employee/employee.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    UnauthorizedComponent,
    LeaderComponent,
    EmployeeComponent,
    NotFoundComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [DecimalPipe],
})
export class PagesModule {}
