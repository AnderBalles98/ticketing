import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "./user.service";
import {UserStoryModel} from "../models/user.story.model";
import {TicketModel} from "../models/ticket.model";

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  private userService = new UserService(this.jwtHelper, this.cookieService, this.http);

  constructor(private http: HttpClient, private cookieService: CookieService, private jwtHelper: JwtHelperService) {
  }

  private getHeaders(): HttpHeaders {
    let Authorization = 'Bearer ' + this.userService.getToken();
    let headers = new HttpHeaders({'Content-Type': 'application/json', Authorization })
    return headers
  }

  listByProjectNameAndCompanyNameAndUserStoryDisplayId(projectName: string, companyName: string, userStoryDisplayId: number): Observable<unknown> {
    let headers = this.getHeaders();
    return this.http.get(environment.apiUrl + `/ticketing/company/ticket/list/by/company/project/userStory/${companyName}/${projectName}/${userStoryDisplayId}/`, {headers})
  }

  createWithUserStoryDisplayId(ticket: TicketModel, userStoryDisplayId: number): Observable<unknown> {
    let headers = this.getHeaders();
    let payload = {
      ...ticket,
      user_story: userStoryDisplayId,
      state: ticket.state.id
    }
    return this.http.post(environment.apiUrl + '/ticketing/company/ticket/create/with/userStoryDisplay/', payload, {headers});
  }

  update(ticket: TicketModel): Observable<unknown> {
    let headers = this.getHeaders();
    let payload = {
      ...ticket,
      user_story: ticket.user_story.id,
      state: ticket.state.id
    }
    return this.http.put(environment.apiUrl + `/ticketing/company/ticket/update/${ticket.id}/`, payload, {headers});
  }

  delete(ticket: TicketModel): Observable<unknown> {
    let headers = this.getHeaders();
    return this.http.delete(environment.apiUrl + `/ticketing/company/ticket/delete/${ticket.id}/`, {headers});
  }

  list(): Observable<unknown> {
    let headers = this.getHeaders();
    return this.http.get(environment.apiUrl + `/ticketing/company/ticket/list/`, {headers});
  }

  getByDisplayId(displayId: number): Observable<unknown> {
    let headers = this.getHeaders();
    return this.http.get(environment.apiUrl + `/ticketing/company/ticket/getBy/displayId/${displayId}/`, {headers});
  }

}
