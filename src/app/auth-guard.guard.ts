import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from './services/apiservice.service';

 
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private apiService:ApiserviceService,private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.apiService.getAuthenticatedUser()){
 
      console.log('sdfghjk');
      return true
    }else{
      console.log("false");
      return this.route.parseUrl("/auth/login");
    }
  }
  
}
