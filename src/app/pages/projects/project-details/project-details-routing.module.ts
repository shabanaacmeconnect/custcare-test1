import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { FilesComponent } from './files/files.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: 'tasks',component:TasksComponent,canActivate:[AuthGuard]},
  { path: 'files',component:FilesComponent,canActivate:[AuthGuard]},
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailsRoutingModule { }
