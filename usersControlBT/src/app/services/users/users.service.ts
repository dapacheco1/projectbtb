import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseServer } from 'src/app/auth/modules/response.module';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public conn:string;

  constructor(private _http:HttpClient) {
    this.conn = environment.url;
  }

  getAllUsers(){
    const route = this.conn + 'users';
    return this._http.get<ResponseServer>(route,)
  }
}
