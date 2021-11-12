import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  private headers: HttpHeaders;
  private token: string;

  constructor(private http: HttpClient, private cookieService: CookieService, private jwtHelper: JwtHelperService) {
    this.token = cookieService.get('token');
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
    let userService = new UserService(this.jwtHelper, this.cookieService);

    let payload = {
      'user': userService.getIdByToken(this.token),
      'company': copmanyId
    }
    let headers = this.headers
    return this.http.post(environment.apiUrl + "/ticketing/company/user/create/", payload, {headers})
  }

}
