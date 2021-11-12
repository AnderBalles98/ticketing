import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "./user.service";
import {CompanyModel} from "../models/company.model";

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private headers: HttpHeaders;
  private userService = new UserService(this.jwtHelper, this.cookieService, this.http);
  private token: string;

  constructor(private http: HttpClient, private cookieService: CookieService, private jwtHelper: JwtHelperService) {
    this.token = this.userService.getToken();
    let Authorization = 'Bearer ' + this.token;
    this.headers = new HttpHeaders({'Content-Type': 'application/json', Authorization })
  }

  listByCompany(companyId: string): Observable<unknown> {
    let headers = this.headers
    console.log(headers)
    let http = this.http.get(environment.apiUrl + `/ticketing/company/project/list/by/company/${companyId}/`, {headers})
    console.log(http)
    return http
  }


}
