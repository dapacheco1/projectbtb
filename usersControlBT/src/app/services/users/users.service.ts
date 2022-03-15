import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseServer } from 'src/app/auth/modules/response.module';
import { User } from 'src/app/auth/modules/user.module';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public conn:string;
  public state:any;

  constructor(private _http:HttpClient) {
    this.conn = environment.url;
  }

  getAllUsers(){
    const route = this.conn + 'users';
    return this._http.get<ResponseServer>(route);
  }

  registerUser(user:any){
    const route = this.conn + 'users';
    return this._http.post<ResponseServer>(route,"data="+JSON.stringify(user),{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }


  validateLoginUs(user:any){
    const route = this.conn + 'users/validate';
    // return this._http.post<ResponseServer>(route,"data="+JSON.stringify(user),{
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // });
    return this._http.post<ResponseServer>(route, user);
  }

  getLoginStatusValidation(){
    return this.state;
  }

  deleteUserById(id:number){
    const route = this.conn + 'users/'+id;
    return this._http.delete<ResponseServer>(route);
  }

  
}
