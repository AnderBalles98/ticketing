import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "./user.service";
import {CompanyModel} from "../models/company.model";
import {ProjectModel} from "../models/project.model";

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private userService = new UserService(this.jwtHelper, this.cookieService, this.http);

  constructor(private http: HttpClient, private cookieService: CookieService, private jwtHelper: JwtHelperService) {
  }

  private getHeaders(): HttpHeaders {
    let Authorization = 'Bearer ' + this.userService.getToken();
    let headers = new HttpHeaders({'Content-Type': 'application/json', Authorization })
    return headers
  }

  listByCompany(companyId: string): Observable<unknown> {
    let headers = this.getHeaders();
    return this.http.get(environment.apiUrl + `/ticketing/company/project/list/by/company/${companyId}/`, {headers})
  }

  create(project: ProjectModel): Observable<unknown> {
    let headers = this.getHeaders();
    let payload = {
      ...project,
      company: project.company.id
    }
    return this.http.post(environment.apiUrl + '/ticketing/company/project/create/', payload, {headers});
  }

  update(project: ProjectModel): Observable<unknown> {
    let headers = this.getHeaders();
    let payload = {
      ...project
    }
    return this.http.put(environment.apiUrl + `/ticketing/company/project/update/${project.id}/`, payload, {headers});
  }


}
