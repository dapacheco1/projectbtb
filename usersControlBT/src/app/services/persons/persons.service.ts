import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseServer } from 'src/app/auth/modules/response.module';
import { Person } from 'src/app/auth/modules/person.module';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  public conn:string;

  constructor(private _http:HttpClient) {
    this.conn = environment.url;
  }

  getAllPersons(){
    const route = this.conn + 'persons';
    return this._http.get<ResponseServer>(route);
  }

  registerPerson(person:Person){
    const route = this.conn + 'persons';
    return this._http.post<ResponseServer>(route,"data="+JSON.stringify(person),{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  deletePerson(personId:number){
    const route = this.conn + `users/${personId}`;
    return this._http.delete<ResponseServer>(route);
  }
}
