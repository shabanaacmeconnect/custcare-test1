import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  { path: '', redirectTo:'profile-edit',pathMatch:'full' },
  // { path: 'company-settings',component:SettingsComponent},
  { path: 'profile-edit',component:ProfileEditComponent},
  
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
