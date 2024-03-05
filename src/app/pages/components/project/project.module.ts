import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectListComponent, ProjectEditComponent],
  imports: [CommonModule, ProjectRoutingModule, FormsModule],
})
export class ProjectModule {}
