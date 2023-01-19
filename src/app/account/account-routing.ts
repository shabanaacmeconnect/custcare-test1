import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitationComponent } from './invitation/invitation.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyComponent } from './verify/verify.component';


const routes: Routes = [
    {
        path: '',
        pathMatch:'full',
        redirectTo:'/login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'verify-account',
        component: VerifyEmailComponent
    },
    {
        path: 'verify-email',
        component: VerifyComponent
    },
    {
        path: 'invitation',
        component: InvitationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
