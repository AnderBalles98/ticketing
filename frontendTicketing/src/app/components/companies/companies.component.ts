import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {CompanyService} from "../../services/company.service";
import {CompanyModel} from "../../models/company.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import swal from "sweetalert2";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  private companyService = new CompanyService(this.http, this.cookieServie, this.jwtHelper)
  public companies: CompanyModel[] = [];

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieServie: CookieService,
              @Inject(JwtHelperService) private jwtHelper: JwtHelperService) {
  }

  registerCompany(companyDict: any) {
    swal.fire({
      'title': `Joining to ${companyDict.name}`,
      'allowOutsideClick': false
    });
    swal.showLoading()
    this.companyService.registerUserByToken(companyDict.id).subscribe((response: any) => {
        swal.close();
    }, (error: any) => {
        swal.close();
    });
  }

  ngOnInit(): void {
    this.companyService.list().subscribe((response: any) => {
      this.companies = response.map((company: any) => {
        return CompanyModel.map(company);
      });
    });

  }

}
