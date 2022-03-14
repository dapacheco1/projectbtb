import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseServer } from 'src/app/auth/modules/response.module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public user:any;
 
  

  constructor(
    private _userServices:UsersService,
    private router: Router) {
      
     }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const user = (localStorage.getItem('user'));

      if(user){
        return true;
      }else{
        this.router.navigateByUrl('');
        return false;
      }
    
  }

 
  
}
