import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  private headers: HttpHeaders

  constructor(private http: HttpClient, private cookieService: CookieService) {
    let Authorization = 'Beaerer ' + cookieService.get('token');
    this.headers = new HttpHeaders({'Content-Type': 'application/json', Authorization })
  }

  list(): Observable<unknown> {
    let headers = this.headers
    console.log(headers)
    let http = this.http.get(environment.apiUrl + "/ticketing/company/list/", {headers})
    console.log(http)
    return http
  }

}
