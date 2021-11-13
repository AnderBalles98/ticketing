import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "./user.service";
import {UserStoryModel} from "../models/user.story.model";

@Injectable({
  providedIn: 'root'
})

export class UserStoryService {

  private userService = new UserService(this.jwtHelper, this.cookieService, this.http);

  constructor(private http: HttpClient, private cookieService: CookieService, private jwtHelper: JwtHelperService) {
  }

  private getHeaders(): HttpHeaders {
    let Authorization = 'Bearer ' + this.userService.getToken();
    let headers = new HttpHeaders({'Content-Type': 'application/json', Authorization })
    return headers
  }

  listByProjectNameAndCompanyName(projectName: string, companyName: string): Observable<unknown> {
    let headers = this.getHeaders();
    return this.http.get(environment.apiUrl + `/ticketing/company/userStory/list/by/company/project/${companyName}/${projectName}/`, {headers})
  }

  create(userStory: UserStoryModel): Observable<unknown> {
    let headers = this.getHeaders();
    let payload = {
      ...userStory,
      project: userStory.project.id
    }
    return this.http.post(environment.apiUrl + '/ticketing/company/userStory/create/', payload, {headers});
  }

  update(userStory: UserStoryModel): Observable<unknown> {
    let headers = this.getHeaders();
    let payload = {
      ...userStory,
      project: userStory.project.id
    }
    return this.http.put(environment.apiUrl + `/ticketing/company/userStory/update/${userStory.id}/`, payload, {headers});
  }

  delete(userStory: UserStoryModel): Observable<unknown> {
    let headers = this.getHeaders();
    return this.http.delete(environment.apiUrl + `/ticketing/company/userStory/delete/${userStory.id}/`, {headers});
  }

  list(): Observable<unknown> {
    let headers = this.getHeaders();
    return this.http.get(environment.apiUrl + `/ticketing/company/userStory/list/`, {headers});
  }



}
