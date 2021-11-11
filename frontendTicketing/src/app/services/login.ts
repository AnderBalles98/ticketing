import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginModel} from "src/app/models/login"
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  login(loginModel: LoginModel): Observable<unknown> {
    let headers = this.headers
    return this.http.post(environment.apiUrl + "/users/login/", loginModel, {headers})
  }

  setToken(token: string) {
    this.cookieService.set('token', token);
  }

  deleteToken() {
    this.cookieService.delete('token');
  }

}
