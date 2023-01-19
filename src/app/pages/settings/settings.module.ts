import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { TaskStatusComponent } from './task-status/task-status.component';
import { TaskTypeComponent } from './task-type/task-type.component';
import { ProjectStatusComponent } from './project-status/project-status.component';
import { ShareduiModule } from 'src/app/sharedui/sharedui.module';
import { ProjectFormComponent } from './project-status/project-form/project-form.component';
// import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { StatusFormComponent } from './task-status/status-form/status-form.component';
import { TypeFormComponent } from './task-type/type-form/type-form.component';
import { ProjectTypeFormComponent } from './project-type/project-type-form/project-type-form.component';
// import { icons, LucideAngularModule } from 'lucide-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { icons, LucideAngularModule } from 'lucide-angular';
import { ProjectTypeComponent } from './project-type/project-type.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';

@NgModule({
  declarations: [
    SettingsComponent,
    TaskStatusComponent,
    TaskTypeComponent,
    ProjectStatusComponent,
    ProjectFormComponent,
    StatusFormComponent,
    TypeFormComponent,
    ProjectTypeComponent,
    ProjectTypeFormComponent,
    DeleteTaskComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    ShareduiModule,
    LucideAngularModule.pick(icons)
    

  ]
})
export class SettingsModule { }
