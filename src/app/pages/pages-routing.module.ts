import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyFormComponent } from './companies/company-form/company-form.component';
import { CompanyWizardComponent } from './companies/company-wizard/company-wizard.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { TasksComponent } from './projects/project-details/tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { SectionsComponent } from './sections/sections.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: '', redirectTo:'/dashboard',pathMatch:'full' },
  { path: 'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  { path: 'companies',component:CompaniesComponent,canActivate:[AuthGuard]},
  { path: 'companies/new-company',component:CompanyWizardComponent,canActivate:[AuthGuard]},
  { path: 'companies/:id',component:CompanyWizardComponent,canActivate:[AuthGuard]},
  { path: 'settings',component:SettingsComponent, loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),canActivate:[AuthGuard] },
  { path: 'projects',component:ProjectsComponent,canActivate:[AuthGuard]},
  { path: 'projects/sections/:id',component:SectionsComponent,canActivate:[AuthGuard]},
  { path: 'customers',component:CustomersComponent,canActivate:[AuthGuard]},
  { path: 'projects/:id',component:ProjectDetailsComponent, loadChildren: () => import('./projects/project-details/project-details.module').then(m => m.ProjectDetailsModule),canActivate:[AuthGuard] },
  { path: 'teams',component:TeamsComponent,canActivate:[AuthGuard]},
  { path: 'tasks',component:TasksComponent,canActivate:[AuthGuard]},
  { path: 'invitations',component:InvitationsComponent,canActivate:[AuthGuard]},
  { path: 'profile',component:ProfileComponent,loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),canActivate:[AuthGuard] },

  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
