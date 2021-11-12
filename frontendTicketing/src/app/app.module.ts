import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {JwtHelperService, JWT_OPTIONS} from "@auth0/angular-jwt";

// Peticiones HttpClient
import {HttpClientModule} from "@angular/common/http";

// Cookies
import {CookieService} from "ngx-cookie-service";

// components
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsComponent } from './components/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CompaniesComponent,
    NavbarComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
