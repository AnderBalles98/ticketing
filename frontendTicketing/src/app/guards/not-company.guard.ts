import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {UserService} from "../services/user.service";
import {CompanyService} from "../services/company.service";
import {CompanyModel} from "../models/company.model";

@Injectable({
  providedIn: 'root'
})
export class NotCompanyGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private companyService: CompanyService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.getMyCompany().pipe(
      map((response: any) => {
        let company = CompanyModel.map(response.company);
        this.companyService.setCompany(company);
        this.router.navigate(['ticketing'])
        return false;
      }),
      catchError((error: any) => {
        return of(true);
      })
    );
  }

}
