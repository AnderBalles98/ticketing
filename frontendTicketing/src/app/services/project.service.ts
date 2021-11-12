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

  private userService = new UserService(this.jwtHelper, this.cookieService, this.http);

  constructor(private http: HttpClient, private cookieService: CookieService, private jwtHelper: JwtHelperService) {
  }

  private getHeaders(): HttpHeaders {
    let Authorization = 'Bearer ' + this.userService.getToken();
    let headers = new HttpHeaders({'Content-Type': 'application/json', Authorization })
    return headers
  }

  listByCompany(companyId: string): Observable<unknown> {
    let headers = this.getHeaders()
    console.log(headers)
    let http = this.http.get(environment.apiUrl + `/ticketing/company/project/list/by/company/${companyId}/`, {headers})
    console.log(http)
    return http
  }


}
