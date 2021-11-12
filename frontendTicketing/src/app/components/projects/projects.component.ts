import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {ProjectModel} from "../../models/project.model";
import {CompanyService} from "../../services/company.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: ProjectModel[] = [];

  private companyService = new CompanyService(this.http, this.cookieServide, this.jwtHelper);
  private projectService = new ProjectService(this.http, this.cookieServide, this.jwtHelper);
  public projectClass = ProjectModel;

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieServide: CookieService,
              @Inject(JwtHelperService) private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    let company = this.companyService.getCompany();
    this.projectService.listByCompany(company.id).subscribe((response: any) => {
      this.projects = response.map((project: any) => {
        return ProjectModel.map(project);
      });
    });
  }

}
