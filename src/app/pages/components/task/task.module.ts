import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { TaskEditComponent } from './task-edit/task-edit.component';

@NgModule({
  declarations: [TaskListComponent, TaskEditComponent],
  imports: [CommonModule, TaskRoutingModule, FormsModule],
})
export class TaskModule {}
