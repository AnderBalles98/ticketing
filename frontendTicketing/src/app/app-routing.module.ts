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

const routes: Routes = [
  {path: '', redirectTo: '/companies', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthenticationGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NotAuthenticationGuard]},
  {path: 'companies', component: CompaniesComponent, canActivate: [AuthenticationGuard, NotCompanyGuard]},
  {path: 'ticketing', component: ProjectsComponent, canActivate: [AuthenticationGuard, CompanyGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
