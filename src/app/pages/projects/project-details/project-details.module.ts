import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { ShareduiModule } from 'src/app/sharedui/sharedui.module';
import { icons, LucideAngularModule } from 'lucide-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { TaskChatComponent } from './task-chat/task-chat.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FilesComponent } from './files/files.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [TasksComponent,TaskFormComponent, TaskChatComponent, FilesComponent],
  imports: [
    CommonModule,
    ShareduiModule,
    LucideAngularModule.pick(icons),
    FormsModule,ReactiveFormsModule,
    ProjectDetailsRoutingModule,
    PickerModule,
    NgSelectModule
  ]
})
export class ProjectDetailsModule { }
