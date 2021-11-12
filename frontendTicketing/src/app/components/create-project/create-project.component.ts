import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../services/project.service";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ProjectModel} from "../../models/project.model";
import {CompanyService} from "../../services/company.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  private projectService = new ProjectService(this.http, this.cookieService, this.jwtHelper);
  private companyService = new CompanyService(this.http, this.cookieService, this.jwtHelper);

  public nameFormControl = new FormControl(this.data.project.name, [Validators.required])
  public descriptionFormControl = new FormControl(this.data.project.description )
  public projectFormGroup = new FormGroup( {
    name: this.nameFormControl,
    description: this.descriptionFormControl
  });

  constructor(@Inject(HttpClient) private http: HttpClient, private dialog: MatDialogRef<CreateProjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, @Inject(CookieService) private cookieService: CookieService,
              @Inject(JwtHelperService) private jwtHelper: JwtHelperService) {
    console.log(data)
  }

  close() {
    this.dialog.close();
  }

  createOrUpdateProject() {
    let project = ProjectModel.map({
      ...this.data.project,
      ...this.projectFormGroup.value,
    });
    console.log(project)
    swal.fire( {
      title: 'Creating project',
      allowOutsideClick: false
    })
    swal.showLoading()
    if (this.data.project.id === '') {
      this.projectService.create(project).subscribe((response: any) => {
        swal.close()
        this.dialog.close(ProjectModel.map({...response}))
      }, (error: HttpErrorResponse) => {
        swal.hideLoading()
        swal.fire('This project is already exists', '', 'error')
      });
    } else {
      this.projectService.update(project).subscribe((response: any) => {
        swal.close()
        this.dialog.close(ProjectModel.map({...response}))
      }, (error: HttpErrorResponse) => {
        swal.hideLoading()
        swal.fire('This project is already exists', '', 'error')
      })
      swal.close()
    }
  }

  ngOnInit(): void {
  }

}
