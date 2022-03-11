import { Component, OnInit } from '@angular/core';
import { User } from '../../modules/user.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user !: User;

  constructor() { }

  ngOnInit(): void {
    this.initUser();
  }

  initUser(){
    this.user = {
      id:-1,
      idPerson:-1,
      rol:'',
      username:'',
      password:'',
      email:'',
      status:'A',
      created_at:'',
      updated_at:''
    };
  }


}
