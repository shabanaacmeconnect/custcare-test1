import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyFormComponent } from './companies/company-form/company-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { icons, LucideAngularModule } from 'lucide-angular';
import { CompanyWizardComponent } from './companies/company-wizard/company-wizard.component';
import { ShareduiModule } from '../sharedui/sharedui.module';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { SectionsComponent } from './sections/sections.component';
import { SectionFormComponent } from './sections/section-form/section-form.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamFormComponent } from './teams/team-form/team-form.component';
import { DateAgoPipe } from './pipe/date-ago.pipe';
import { InvitationsComponent } from './invitations/invitations.component';
import { ProfileComponent } from './profile/profile.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    DashboardComponent,
    CompaniesComponent,
    CompanyFormComponent,
    CompanyWizardComponent,
    ProjectsComponent,
    ProjectFormComponent,
   
    SectionsComponent,
    SectionFormComponent,
    CustomersComponent,
    CustomerFormComponent,
    ProjectDetailsComponent,
    TeamsComponent,
    TeamFormComponent,
    DateAgoPipe,
    InvitationsComponent,
    ProfileComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    FormsModule,ReactiveFormsModule,
    LucideAngularModule.pick(icons),
    ShareduiModule,
    NgSelectModule

  ],
})
export class PagesModule { }
