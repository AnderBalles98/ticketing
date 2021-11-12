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

  public newUserStory = new UserStoryModel();

  public company = this.companyService.getCompany();

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieServide: CookieService,
              @Inject(JwtHelperService) private jwtHelper: JwtHelperService, public dialog: MatDialog, private router: Router,
              private route: ActivatedRoute) {
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateUserStoryComponent, {
      disableClose: true,
      width: '500px',
      data: {
        project: this.newUserStory,
        title: 'New user story',
        buttonText: 'Create'
      }
    });
    dialogRef.afterClosed().subscribe((result: ProjectModel | any) => {
      if (result) {
        this.userStories.push(result);
      }
    });
  }

  openModifyProjectDialog(userStory: UserStoryModel, index: number): void {
    const dialogRef = this.dialog.open(CreateUserStoryComponent, {
      disableClose: true,
      width: '500px',
      data: {
        project: userStory,
        title: 'Update user story',
        buttonText: 'Update'
      }
    });
    dialogRef.afterClosed().subscribe((result: UserStoryModel | any) => {
      if (result) {
        this.userStories[index] = result;
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      swal.fire({
        allowOutsideClick: false
      });
      swal.showLoading();
      const {params} = paramMap;
      let projectName = params.projectName;
      console.log(projectName)
      this.userStoryService.listByProjectNameAndCompanyName(projectName, this.company.name).subscribe((response: any) => {
        console.log(response)
        this.userStories = response.map((userStory: any) => {
          return UserStoryModel.map(userStory);
        });
        swal.close()
      },  (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.router.navigate(['/404'])
          swal.close()
        }
      });
    });
  }

}
