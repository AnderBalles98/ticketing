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

  private userService = new UserService(this.jwtHelper, this.cookieService, this.http);
  private companyKey = 'company';

  constructor(private http: HttpClient, private cookieService: CookieService, private jwtHelper: JwtHelperService) {
  }

  private getHeaders(): HttpHeaders {
    let Authorization = 'Bearer ' + this.userService.getToken();
    let headers = new HttpHeaders({'Content-Type': 'application/json', Authorization })
    return headers
  }

  list(): Observable<unknown> {
    let headers = this.getHeaders()
    return this.http.get(environment.apiUrl + "/ticketing/company/list/", {headers})
  }

  registerUserByToken(copmanyId: string): Observable<unknown> {
    let userService = new UserService(this.jwtHelper, this.cookieService, this.http);
    let token = userService.getToken()
    let payload = {
      'user': userService.getIdByToken(token),
      'company': copmanyId
    }
    let headers = this.getHeaders()
    return this.http.post(environment.apiUrl + "/ticketing/company/user/create/", payload, {headers})
  }

  setCompany(company: CompanyModel):void {
    this.cookieService.set(this.companyKey, JSON.stringify(company), 1);
  }

  getCompany(): CompanyModel  {
    let companyDict = this.cookieService.get(this.companyKey);
    return CompanyModel.map(JSON.parse(companyDict));
  }

  deleteCompany():void {
    this.cookieService.delete(this.companyKey);
  }

}
