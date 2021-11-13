import {Component, Inject, OnInit} from '@angular/core';
import {ProjectModel} from "../../models/project.model";
import {CompanyService} from "../../services/company.service";
import {ProjectService} from "../../services/project.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog} from "@angular/material/dialog";
import {CreateProjectComponent} from "../create-project/create-project.component";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserStoryModel} from "../../models/user.story.model";
import {UserStoryService} from "../../services/user.story.service";
import {CreateUserStoryComponent} from "../create-user-story/create-user-story.component";
import {CompanyModel} from "../../models/company.model";
import swal from "sweetalert2";

@Component({
  selector: 'app-user-stories',
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.scss']
})
export class UserStoriesComponent implements OnInit {

  public userStories: UserStoryModel[] = [];

  private companyService = new CompanyService(this.http, this.cookieServide, this.jwtHelper);
  private userStoryService = new UserStoryService(this.http, this.cookieServide, this.jwtHelper);
  private projectService = new ProjectService(this.http, this.cookieServide, this.jwtHelper);

  public newUserStory = new UserStoryModel();
  private availableProjects: ProjectModel[] = [];


  public company = this.companyService.getCompany();

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieServide: CookieService,
              @Inject(JwtHelperService) private jwtHelper: JwtHelperService, public dialog: MatDialog, private router: Router,
              private route: ActivatedRoute) {
  }

  openCreateUserStoryDialog(): void {
    const dialogRef = this.dialog.open(CreateUserStoryComponent, {
      disableClose: true,
      width: '500px',
      data: {
        userStory: this.newUserStory,
        title: 'New user story',
        buttonText: 'Create',
        defaultProject: this.newUserStory.project,
        availableProjects: this.availableProjects
      }
    });
    dialogRef.afterClosed().subscribe((result: UserStoryModel | undefined) => {
      if (result) {
        console.log((this.newUserStory))
        console.log(result)
        if (this.newUserStory.project.id === '' || this.newUserStory.project.id === result.project.id) {
          this.userStories.push(result);
        }
      }
    });
  }

  openModifyUserStoryDialog(userStory: UserStoryModel, index: number): void {
    const dialogRef = this.dialog.open(CreateUserStoryComponent, {
      disableClose: true,
      width: '500px',
      data: {
        userStory: userStory,
        title: 'Update user story',
        buttonText: 'Update',
        defaultProject: userStory.project,
        availableProjects: this.availableProjects
      }
    });
    dialogRef.afterClosed().subscribe((result: UserStoryModel | any) => {
      if (result) {
        this.userStories[index] = result;
      }
    });
  }

  delete(userStory: UserStoryModel) {
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
        this.userStoryService.delete(userStory).subscribe(() => {
          swal.close();
          this.userStories = this.userStories.filter((userStoryLoop, index) => {
            if (userStoryLoop.id == userStory.id) {
              return;
            }
            return userStory;
          });
          swal.fire(
            'Deleted!',
            `User story ${userStory.name} was deleted`,
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
      this.projectService.listByCompanyId(this.company.id).subscribe((response: any) => {
        let availableProjects: ProjectModel[] = [];
        response.forEach((project: any) => {
          if (project.name === projectName) {
            this.newUserStory = UserStoryModel.map({project});
          }
          availableProjects.push(ProjectModel.map(project));
        });
        this.availableProjects = availableProjects;
        if (projectName) {
          this.userStoryService.listByProjectNameAndCompanyName(projectName, this.company.name).subscribe((response: any) => {
            console.log(response)
            this.userStories = response.map((userStory: any) => {
              return UserStoryModel.map(userStory);
            });
            console.log(this.userStories)
            swal.close()
          }, (error: HttpErrorResponse) => {
            if (error.status == 404) {
              this.router.navigate(['/404'])
              swal.close()
            }
          });
        } else {
          this.userStoryService.list().subscribe((response: any) => {
            this.userStories = response.filter((userStory: any) => {
              if (userStory.project.company.id === this.company.id) {
                console.log(userStory)
                return UserStoryModel.map(userStory);
              } else {
                return;
              }
            });
            console.log("dasdasdasda", this.userStories)
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
