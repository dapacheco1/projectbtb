import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/modules/user.module';

@Component({
  selector: 'app-header-crud',
  templateUrl: './header-crud.component.html',
  styleUrls: ['./header-crud.component.scss']
})
export class HeaderCrudComponent implements OnInit {

  public user!:User;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.initUserData();
  }
  
  initUserData(){
    const res:any = localStorage.getItem('user');
    const x  = JSON.parse(res);
    
    this.user ={
      id: x.id,
      idPerson:x.idPerson,
      username:x.username,
      password:'',
      status:x.status,
      rol:x.rol,
      email:x.email,
      created_at:x.created_at,
      updated_at:x.updated_at
    };
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('');

  }
}
