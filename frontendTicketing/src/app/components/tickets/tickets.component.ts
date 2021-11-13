import {Component, Inject, OnInit} from '@angular/core';
import {UserStoryModel} from "../../models/user.story.model";
import {CompanyService} from "../../services/company.service";
import {UserStoryService} from "../../services/user.story.service";
import {ProjectService} from "../../services/project.service";
import {ProjectModel} from "../../models/project.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateUserStoryComponent} from "../create-user-story/create-user-story.component";
import swal from "sweetalert2";
import {TicketStateService} from "../../services/ticket.state.service";
import {TicketService} from "../../services/ticket.service";
import {TicketStateModel} from "../../models/ticket.state.model";
import {TicketModel} from "../../models/ticket.model";
import {CreateTicketComponent} from "../create-ticket/create-ticket.component";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  public tickets: TicketModel[] = [];

  private companyService = new CompanyService(this.http, this.cookieServide, this.jwtHelper);
  private userStoryService = new UserStoryService(this.http, this.cookieServide, this.jwtHelper);
  private projectService = new ProjectService(this.http, this.cookieServide, this.jwtHelper);
  private ticketStateService = new TicketStateService(this.jwtHelper, this.cookieServide, this.http);
  private ticketService = new TicketService(this.http, this.cookieServide, this.jwtHelper);

  public newTicket = new TicketModel();
  private availableStates: TicketStateModel[] = [];
  public isCreationDisabled = true;
  public defaultUserStoryDisplayId: number = 0;


  public company = this.companyService.getCompany();

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieServide: CookieService,
              @Inject(JwtHelperService) private jwtHelper: JwtHelperService, public dialog: MatDialog, private router: Router,
              private route: ActivatedRoute) {
  }

  openCreateTicketDialog(): void {
    const dialogRef = this.dialog.open(CreateTicketComponent, {
      disableClose: true,
      width: '500px',
      data: {
        ticket: this.newTicket,
        title: 'New user story',
        buttonText: 'Create',
        defaultUserStory: this.defaultUserStoryDisplayId,
        availableStates: this.availableStates
      }
    });
    dialogRef.afterClosed().subscribe((result: TicketModel | undefined) => {
      if (result) {
        console.log((this.newTicket))
        console.log(result)
        if (this.newTicket.user_story.id === '' || this.newTicket.user_story.id === result.user_story.id) {
          this.tickets.push(result);
        }
      }
    });
  }

  openModifyTicketDialog(ticket: TicketModel, index: number): void {
    const dialogRef = this.dialog.open(CreateTicketComponent, {
      disableClose: true,
      width: '500px',
      data: {
        ticket: ticket,
        title: 'Update user story',
        buttonText: 'Update',
        defaultUserStory: ticket.user_story,
        availableStates: this.availableStates
      }
    });
    dialogRef.afterClosed().subscribe((result: TicketModel | any) => {
      if (result) {
        this.tickets[index] = result;
      }
    });
  }

  delete(ticket: TicketModel) {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swal.fire({
          allowOutsideClick: false
        });
        swal.showLoading();
        this.ticketService.delete(ticket).subscribe(() => {
          swal.close();
          this.tickets = this.tickets.filter((ticketLoop, index) => {
            if (ticketLoop.id == ticket.id) {
              return;
            }
            return ticket;
          });
          swal.fire(
            'Deleted!',
            `Ticket ${ticket.name} was deleted`,
            'success'
          );

        }, () => {
          swal.close();
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      swal.fire({
        allowOutsideClick: false
      });
      swal.showLoading();
      const {params} = paramMap;
      let projectName = params.projectName;
      let userStoryDisplayId: number = params.userStoryDisplayId;
      this.ticketStateService.list().subscribe((response: any) => {
        let ticketStateModels: TicketStateModel[] = [];
        response.forEach((ticketState: any) => {
          ticketStateModels.push(TicketStateModel.map(ticketState));
        });
        this.availableStates = ticketStateModels;
        if (projectName && userStoryDisplayId) {
          this.defaultUserStoryDisplayId = userStoryDisplayId;
          this.isCreationDisabled = false;
          this.ticketService.listByProjectNameAndCompanyNameAndUserStoryDisplayId(projectName, this.company.name, userStoryDisplayId).subscribe((response: any) => {
            this.tickets = response.map((ticket: any) => {
              return TicketModel.map(ticket);
            });
            console.log("tickets")
            console.log(this.tickets)
            swal.close()
          }, (error: HttpErrorResponse) => {
            if (error.status == 404) {
              this.router.navigate(['/404'])
              swal.close()
            }
          });
        } else {
          this.ticketService.list().subscribe((response: any) => {
            this.tickets = response.filter((ticket: any) => {
              if (ticket.user_story.project.company.id === this.company.id) {
                console.log(ticket)
                return TicketModel.map(ticket);
              } else {
                return;
              }
            });
            console.log("dasdasdasda", this.tickets)
            swal.close()
          }, (error: HttpErrorResponse) => {
            if (error.status == 404) {
              this.router.navigate(['/404'])
              swal.close()
            }
          });
        }


      }, (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.router.navigate(['/404'])
          swal.close()
        }
      });

    });
  }

}
