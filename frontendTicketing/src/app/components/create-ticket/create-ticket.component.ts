import {Component, Inject, OnInit} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {UserStoryService} from "../../services/user.story.service";
import {ProjectModel} from "../../models/project.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserStoryModel} from "../../models/user.story.model";
import swal from "sweetalert2";
import {TicketModel} from "../../models/ticket.model";
import {TicketService} from "../../services/ticket.service";

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  private companyService = new CompanyService(this.http, this.cookieService, this.jwtHelper);
  private userStoryService = new UserStoryService(this.http, this.cookieService, this.jwtHelper);
  private ticketService = new TicketService(this.http, this.cookieService, this.jwtHelper);
  public availableStates: ProjectModel[] = [];


  public nameFormControl = new FormControl(this.data.ticket.name, [Validators.required]);
  public descriptionFormControl = new FormControl(this.data.ticket.description );
  public StateFormControl = new FormControl(this.data.ticket.state.id + "")
  public TicketFormGroup = new FormGroup( {
    name: this.nameFormControl,
    description: this.descriptionFormControl,
    state: this.StateFormControl,
  });

  constructor(@Inject(HttpClient) private http: HttpClient, private dialog: MatDialogRef<CreateTicketComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, @Inject(CookieService) private cookieService: CookieService,
              @Inject(JwtHelperService) private jwtHelper: JwtHelperService) {

    this.availableStates = this.data.availableStates;
    console.log(this.data)
  }


  close() {
    this.dialog.close();
  }

  createOrUpdateStoryUser() {
    let ticket = TicketModel.map({
      ...this.data.ticket,
      ...this.TicketFormGroup.value,
      state: ProjectModel.map({id: this.TicketFormGroup.value.state}),
    });
    console.log(ticket)
    swal.fire( {
      title: 'Creating ticket',
      allowOutsideClick: false
    })
    swal.showLoading()
    if (this.data.ticket.id === '') {
      this.ticketService.createWithUserStoryDisplayId(ticket, this.data.defaultUserStory).subscribe((response: any) => {
        swal.close()
        this.dialog.close(TicketModel.map({...response}))
      }, (error: HttpErrorResponse) => {
        swal.hideLoading()
        swal.fire('This ticket couldn\'t be created or updated', '', 'error')
      });
    } else {
      this.ticketService.update(ticket).subscribe((response: any) => {
        swal.close()
        this.dialog.close(TicketModel.map({...response}))
      }, (error: HttpErrorResponse) => {
        swal.hideLoading()
        swal.fire('This ticket couldn\'t be created or updated', '', 'error')
      })
      swal.close()
    }
  }


  ngOnInit(): void {
  }

}
