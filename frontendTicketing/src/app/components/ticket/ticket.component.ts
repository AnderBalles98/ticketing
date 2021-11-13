import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import swal from "sweetalert2";
import {CommentModel} from "../../models/comment.model";
import {TicketModel} from "../../models/ticket.model";
import {TicketService} from "../../services/ticket.service";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  private comments: CommentModel[] = [];
  private ticket: TicketModel = new TicketModel();
  private ticketService = new TicketService(this.http, this.cookieServide, this.jwtHelper);
  private commentService = new CommentService(this.http, this.cookieServide, this.jwtHelper);

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieServide: CookieService,
              @Inject(JwtHelperService) private jwtHelper: JwtHelperService, public dialog: MatDialog, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      swal.fire({
        allowOutsideClick: false
      });
      swal.showLoading();
      const {params} = paramMap;
      let ticketDisplayId = params.displayId;
      this.ticketService.getByDisplayId(ticketDisplayId).subscribe((response: any) => {
        let ticket: TicketModel = TicketModel.map(response);
        this.ticket = ticket;
        this.commentService.listByTicketDisplayId(ticketDisplayId).subscribe((response: any) => {
          console.log(response)
        }, (error: HttpErrorResponse) => {
          console.log('error')
        });
      }, (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.router.navigate(['/404'])
          swal.close()
        }
      });
    });
  }

}
