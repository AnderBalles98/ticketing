import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import {CookieService} from "ngx-cookie-service";
import {RegisterModel} from "../models/register";

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {
  }

  register(registerModel: RegisterModel): Observable<unknown> {
    let headers = this.headers
    return this.http.post(environment.apiUrl + "/users/create/", registerModel, {headers})
  }

}
