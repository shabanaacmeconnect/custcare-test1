import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { icons, LucideAngularModule } from 'lucide-angular';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    SidebarComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule.pick(icons)

  ]
})
export class LayoutModule { }
