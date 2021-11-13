import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterModel} from "../../models/register.model";
import {RegisterService} from "../../services/register.service";
import swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import {MatchValidator} from "../../validators/match";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwordMinLength = 8;
  registerControlUsername = new FormControl('', [Validators.required]);
  registerControlPassword = new FormControl('', [Validators.required, Validators.minLength(this.passwordMinLength), Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]);
  registerControlConfirmPassword = new FormControl('', [Validators.required]);
  registerControlEmail = new FormControl('', [Validators.required, Validators.email]);
  registerControlName = new FormControl('');
  registerControlLastName = new FormControl('');

  registerControlForm = new FormGroup({
    username: this.registerControlUsername,
    password: this.registerControlPassword,
    confirmPassword: this.registerControlConfirmPassword,
    email: this.registerControlEmail,
    first_name: this.registerControlName,
    last_name: this.registerControlLastName
  },
    {
      validators: [MatchValidator(this.registerControlPassword, this.registerControlConfirmPassword)]
    });

  private registerService = new RegisterService(this.http);

  constructor(@Inject(HttpClient) private http: HttpClient, private router: Router) { }

  isFormControlInvalid(formControl: FormControl): boolean {
    return formControl.invalid && formControl.touched
  }

  getErrorRegisterControlPassword(): string {
    if (this.registerControlPassword.touched) {
      if (this.registerControlPassword.hasError('required')){
        return 'Password is required'
      }
      if (this.registerControlPassword.hasError('minlength')){
        return `Password must contain min ${this.passwordMinLength} characters`
      }
      if (this.registerControlPassword.hasError('pattern')){
        return 'Password must contain at least 1 number and 1 lowercase and uppercase letter'
      }
    }
    return '';
  }

  getErrorRegisterControlEmail(): string {
    if (this.registerControlEmail.touched) {
      if (this.registerControlEmail.hasError('required')){
        return 'Email is required'
      }
    }
    return '';
  }

  getErrorRegisterControlUsername(): string {
    if (this.registerControlUsername.touched) {
      if (this.registerControlUsername.hasError('required')){
        return 'Username is required'
      }
    }
    return '';
  }

  getErrorRegisterControlConfirmPassword(): string {
    if (this.registerControlConfirmPassword.touched) {
      if (this.registerControlConfirmPassword.hasError('required')){
        return 'Password confirmation is required'
      }
      if (this.registerControlConfirmPassword.hasError('match')){
        return 'Password doesn\'t match'
      }
    }
    return '';

  }



  register(){
    let register = RegisterModel.map(this.registerControlForm.value);
    this.registerService.register(register).subscribe((response: any) => {
      swal.fire('Successful registration ', '', 'success')
        .then(() => {
            this.router.navigate(['/login'])
        });
    }, (error: any) => {
      swal.fire('A user with that username already exists', '', 'error');
    });
  }

  ngOnInit(): void {
  }

}
