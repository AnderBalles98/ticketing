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

export class CompanyService {

  private headers: HttpHeaders;
  private userService = new UserService(this.jwtHelper, this.cookieService, this.http);
  private companyKey = 'company';
  private token: string;

  constructor(private http: HttpClient, private cookieService: CookieService, private jwtHelper: JwtHelperService) {
    this.token = this.userService.getToken();
    let Authorization = 'Bearer ' + this.token;
    this.headers = new HttpHeaders({'Content-Type': 'application/json', Authorization })
  }

  list(): Observable<unknown> {
    let headers = this.headers
    console.log(headers)
    let http = this.http.get(environment.apiUrl + "/ticketing/company/list/", {headers})
    console.log(http)
    return http
  }

  registerUserByToken(copmanyId: string): Observable<unknown> {
    let userService = new UserService(this.jwtHelper, this.cookieService, this.http);

    let payload = {
      'user': userService.getIdByToken(this.token),
      'company': copmanyId
    }
    let headers = this.headers
    return this.http.post(environment.apiUrl + "/ticketing/company/user/create/", payload, {headers})
  }

  setCompany(company: CompanyModel) {
    this.cookieService.set(this.companyKey, JSON.stringify(company), 1);
  }

  getCompany(): CompanyModel  {
    let companyDict = this.cookieService.get(this.companyKey);
    return CompanyModel.map(JSON.parse(companyDict));
  }

}
