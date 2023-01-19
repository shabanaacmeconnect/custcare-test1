import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { icons, LucideAngularModule } from 'lucide-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareduiModule } from 'src/app/sharedui/sharedui.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
  declarations: [ProfileEditComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    ShareduiModule,
    LucideAngularModule.pick(icons)
  ]
})
export class ProfileModule { }
