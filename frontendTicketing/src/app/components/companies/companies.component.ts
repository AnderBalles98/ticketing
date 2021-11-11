import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {CompanyService} from "../../services/company";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  private companyService = new CompanyService(this.http, this.cookieServie)

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(CookieService) private cookieServie: CookieService) {
  }

  ngOnInit(): void {
    this.companyService.list().subscribe((response: any) => {
      console.log(response)
    });

  }

}
