import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {LoginModel} from "../../models/login";
import {LoginService} from "../../services/login";
import swal from "sweetalert2"

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

  private loginService = new LoginService(this.http, this.cookieService)


  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieService: CookieService) {
  }

  login(){
    let login = LoginModel.map(this.loginControlForm.value);
    this.loginService.login(login).subscribe((response: any) => {
      this.loginService.setToken(response.token);
    }, (error: any) => {
      console.log(error.error);
      swal.fire('Invalid credentials', 'Login', 'error');
      this.loginControlPassword.setValue('');
      this.loginService.deleteToken();
    });
  }

  ngOnInit(): void {
  }

}
