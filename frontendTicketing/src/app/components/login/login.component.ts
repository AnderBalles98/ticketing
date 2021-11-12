import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {LoginModel} from "../../models/login.model";
import {LoginService} from "../../services/login.service";
import swal from "sweetalert2"
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginControlUsername = new FormControl('', [Validators.required]);
  loginControlPassword = new FormControl('', [Validators.required]);
  loginControlForm = new FormGroup({
    username: this.loginControlUsername,
    password: this.loginControlPassword
  });

  private loginService = new LoginService(this.http, this.cookieService, this.jwtHelpet)
  private userService = new UserService(this.jwtHelpet, this.cookieService)

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieService: CookieService,
              @Inject(JwtHelperService) private jwtHelpet: JwtHelperService, private router: Router) {
  }

  login(){
    let login = LoginModel.map(this.loginControlForm.value);
    this.loginService.login(login).subscribe((response: any) => {
      this.userService.setToken(response.token);
      this.router.navigate(['/companies']);
    }, (error: any) => {
      console.log(error.error);
      swal.fire('Invalid credentials', 'Login', 'error');
      this.loginControlPassword.setValue('');
      this.userService.deleteToken();
    });
  }

  ngOnInit(): void {
  }

}
