import {Component, Inject, OnInit} from '@angular/core';
import {ProjectModel} from "../../models/project.model";
import {CompanyService} from "../../services/company.service";
import {ProjectService} from "../../services/project.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog} from "@angular/material/dialog";
import {CreateProjectComponent} from "../create-project/create-project.component";

@Component({
  selector: 'app-user-stories',
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.scss']
})
export class UserStoriesComponent implements OnInit {

  public projects: ProjectModel[] = [];

  private companyService = new CompanyService(this.http, this.cookieServide, this.jwtHelper);
  private projectService = new ProjectService(this.http, this.cookieServide, this.jwtHelper);
  public projectClass = ProjectModel;
  public newProject = ProjectModel.map({
    company: this.companyService.getCompany()
  });

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieServide: CookieService,
              @Inject(JwtHelperService) private jwtHelper: JwtHelperService, public dialog: MatDialog) {
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      disableClose: true,
      width: '500px',
      data: {
        project: this.newProject,
        title: 'New project',
        buttonText: 'Create'
      }
    });
    dialogRef.afterClosed().subscribe((result: ProjectModel | any) => {
      if (result) {
        this.projects.push(result);
      }
    });
  }

  openModifyProjectDialog(project: ProjectModel, index: number): void {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      disableClose: true,
      width: '500px',
      data: {
        project,
        title: 'Update project',
        buttonText: 'Update'
      }
    });
    dialogRef.afterClosed().subscribe((result: ProjectModel | any) => {
      if (result) {
        this.projects[index] = result;
      }
    });
  }

  ngOnInit(): void {
  }

}
