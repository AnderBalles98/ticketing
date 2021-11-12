import {Component, Inject, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CompanyService} from "../../services/company.service";
import {Router} from "@angular/router";
import {CompanyModel} from "../../models/company.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  private userService = new UserService(this.jwtHelper, this.cookieService, this.http);
  private companyService = new CompanyService(this.http, this.cookieService, this.jwtHelper);

  public companyName = this.companyService.getCompany().name;

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieService: CookieService,
              @Inject(JwtHelperService) private jwtHelper: JwtHelperService, private router: Router) { }

  logOut() {
    this.userService.deleteToken();
    this.companyService.deleteCompany();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
