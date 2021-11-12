import {JwtHelperService} from "@auth0/angular-jwt";
import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private tokenKey = 'token';
  private headers: HttpHeaders;

  constructor(private jwtHelper: JwtHelperService, private cookieService: CookieService, private http: HttpClient) {
    let Authorization = 'Bearer ' + this.getToken();
    this.headers = new HttpHeaders({'Content-Type': 'application/json', Authorization })
  }

  getIdByToken(token: string): number {
    let tokenPayload = this.jwtHelper.decodeToken(token);
    console.log(tokenPayload)
    return tokenPayload.user_id;
  }

  setToken(token: string) {
    this.cookieService.set(this.tokenKey, token, {expires: (1/24)*2});
  }

  deleteToken() {
    this.cookieService.delete(this.tokenKey);
  }

  getToken(): string {
    return this.cookieService.get(this.tokenKey)
  }

  getMyCompany(): Observable<any> {
    let headers = this.headers;
    return this.http.get(environment.apiUrl + "/ticketing/company/user/my/", {headers})
  }

  isTokenValid(): boolean {
    if (this.cookieService.check(this.tokenKey)){
      let token = this.getToken();
      try {
        return !this.jwtHelper.isTokenExpired(token);
      } catch (error) {
        return false;
      }
    }
    return false;
  }

}
