import {Component, Inject, OnInit} from '@angular/core';
import {ProjectModel} from "../../models/project.model";
import swal from "sweetalert2";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ProjectService} from "../../services/project.service";
import {CompanyService} from "../../services/company.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserStoryService} from "../../services/user.story.service";
import {UserStoryModel} from "../../models/user.story.model";

@Component({
  selector: 'app-create-user-story',
  templateUrl: './create-user-story.component.html',
  styleUrls: ['./create-user-story.component.scss']
})
export class CreateUserStoryComponent implements OnInit {

  private companyService = new CompanyService(this.http, this.cookieService, this.jwtHelper);
  private userStoryService = new UserStoryService(this.http, this.cookieService, this.jwtHelper);
  public availableProjects: ProjectModel[] = [];


  public nameFormControl = new FormControl(this.data.userStory.name, [Validators.required]);
  public descriptionFormControl = new FormControl(this.data.userStory.description );
  public projectFormControl = new FormControl(this.data.defaultProject.id)
  public UserStoryFormGroup = new FormGroup( {
    name: this.nameFormControl,
    description: this.descriptionFormControl,
    project: this.projectFormControl
  });

  constructor(@Inject(HttpClient) private http: HttpClient, private dialog: MatDialogRef<CreateUserStoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, @Inject(CookieService) private cookieService: CookieService,
              @Inject(JwtHelperService) private jwtHelper: JwtHelperService) {

    this.availableProjects = this.data.availableProjects;
    console.log(this.data)
  }

  close() {
    this.dialog.close();
  }

  createOrUpdateStoryUser() {
    let userStory = UserStoryModel.map({
      ...this.data.userStory,
      ...this.UserStoryFormGroup.value,
      project: ProjectModel.map({id: this.UserStoryFormGroup.value.project})
    });
    console.log(userStory)
    swal.fire( {
      title: 'Creating project',
      allowOutsideClick: false
    })
    swal.showLoading()
    if (this.data.userStory.id === '') {
      this.userStoryService.create(userStory).subscribe((response: any) => {
        swal.close()
        this.dialog.close(UserStoryModel.map({...response}))
      }, (error: HttpErrorResponse) => {
        swal.hideLoading()
        swal.fire('This user story is already exists', '', 'error')
      });
    } else {
      this.userStoryService.update(userStory).subscribe((response: any) => {
        swal.close()
        this.dialog.close(UserStoryModel.map({...response}))
      }, (error: HttpErrorResponse) => {
        swal.hideLoading()
        swal.fire('This user story is already exists', '', 'error')
      })
      swal.close()
    }
  }


  ngOnInit(): void {
  }

}
