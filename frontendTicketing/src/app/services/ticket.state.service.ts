import {JwtHelperService} from "@auth0/angular-jwt";
import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})

export class TicketStateService {

  private userService = new UserService(this.jwtHelper, this.cookieService, this.http);

  constructor(private jwtHelper: JwtHelperService, private cookieService: CookieService, private http: HttpClient, ) {
  }

  private getHeaders(): HttpHeaders {
    let Authorization = 'Bearer ' + this.userService.getToken();
    let headers = new HttpHeaders({'Content-Type': 'application/json', Authorization })
    return headers
  }


  list(): Observable<unknown> {
    let headers = this.getHeaders();
    return this.http.get(environment.apiUrl + "/ticketing/company/ticket/state/list/", {headers})
  }



}
