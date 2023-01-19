import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { icons, LucideAngularModule } from 'lucide-angular';
import { VerifyComponent } from './verify/verify.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { InvitationComponent } from './invitation/invitation.component';
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    VerifyComponent,
    VerifyEmailComponent,
    InvitationComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule.pick(icons)
  ]
})
export class AccountModule { }
