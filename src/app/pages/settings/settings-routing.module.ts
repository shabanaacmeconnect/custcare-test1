import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { ProjectStatusComponent } from './project-status/project-status.component';
import { ProjectTypeComponent } from './project-type/project-type.component';
import { SettingsComponent } from './settings/settings.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { TaskTypeComponent } from './task-type/task-type.component';

const routes: Routes = [
  { path: '', redirectTo:'project-types',pathMatch:'full' },
  // { path: 'company-settings',component:SettingsComponent},
  { path: 'project-status',component:ProjectStatusComponent},
  { path: 'project-types',component:ProjectTypeComponent},
  { path: 'task-status',component:TaskStatusComponent},
  { path: 'task-types',component:TaskTypeComponent},
  { path: 'delete-task',component:DeleteTaskComponent},

  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
