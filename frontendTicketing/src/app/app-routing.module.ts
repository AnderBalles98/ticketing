import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CompaniesComponent} from "./components/companies/companies.component";

// guards
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NotAuthenticationGuard} from "./guards/not-authentication.guard";
import {ProjectsComponent} from "./components/projects/projects.component";
import {CompanyGuard} from "./guards/company.guard";
import {NotCompanyGuard} from "./guards/not-company.guard";
import {UserStoriesComponent} from "./components/user-stories/user-stories.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {TicketsComponent} from "./components/tickets/tickets.component";

const routes: Routes = [
  {path: '', redirectTo: '/companies', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthenticationGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NotAuthenticationGuard]},
  {path: 'companies', component: CompaniesComponent, canActivate: [AuthenticationGuard, NotCompanyGuard]},
  {path: 'ticketing', component: ProjectsComponent, canActivate: [AuthenticationGuard, CompanyGuard]},
  {path: 'ticketing/:projectName', component: UserStoriesComponent, canActivate: [AuthenticationGuard, CompanyGuard]},
  {path: 'userStories', component: UserStoriesComponent, canActivate: [AuthenticationGuard, CompanyGuard]},
  {path: 'ticketing/:projectName/:userStoryDisplayId', component: TicketsComponent, canActivate: [AuthenticationGuard, CompanyGuard]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
