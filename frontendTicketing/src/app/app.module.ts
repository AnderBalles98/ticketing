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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProjectComponent } from './components/create-project/create-project.component';


// dialog
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { UserStoriesComponent } from './components/user-stories/user-stories.component';
import { CreateUserStoryComponent } from './components/create-user-story/create-user-story.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {MatSelectModule} from "@angular/material/select";
import { TicketsComponent } from './components/tickets/tickets.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { TicketComponent } from './components/ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CompaniesComponent,
    NavbarComponent,
    ProjectsComponent,
    CreateProjectComponent,
    UserStoriesComponent,
    CreateUserStoryComponent,
    NotFoundComponent,
    TicketsComponent,
    CreateTicketComponent,
    TicketComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule
    ],
  providers: [CookieService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
