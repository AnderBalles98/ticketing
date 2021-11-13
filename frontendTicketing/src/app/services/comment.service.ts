import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "src/environments/environment";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "./user.service";
import {CommentModel} from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  private userService = new UserService(this.jwtHelper, this.cookieService, this.http);

  constructor(private http: HttpClient, private cookieService: CookieService, private jwtHelper: JwtHelperService) {
  }

  private getHeaders(): HttpHeaders {
    let Authorization = 'Bearer ' + this.userService.getToken();
    let headers = new HttpHeaders({'Content-Type': 'application/json', Authorization })
    return headers
  }

  listByTicketDisplayId(ticketDisplayId: string): Observable<unknown> {
    let headers = this.getHeaders();
    return this.http.get(environment.apiUrl + `/company/comment/list/by/ticket/${ticketDisplayId}/`, {headers})
  }

  createWithTicketDisplayId(comment: CommentModel, ticket_display_id: number): Observable<unknown> {
    let headers = this.getHeaders();
    let payload = {
      ...comment,
      ticket_display_id
    }
    return this.http.post(environment.apiUrl + '/company/comment/create/', payload, {headers});
  }

  update(comment: CommentModel): Observable<unknown> {
    let headers = this.getHeaders();
    let payload = {
      ...comment
    }
    return this.http.put(environment.apiUrl + `/company/comment/update/${comment.id}/`, payload, {headers});
  }

  delete(commet: CommentModel): Observable<unknown> {
    let headers = this.getHeaders();
    return this.http.delete(environment.apiUrl + `/company/comment/delete/${commet.id}/`, {headers});
  }

}
