import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth/auth.guard';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from '../../modules/user.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user!:User;

  constructor(private _authService:UsersService,private router:Router) { }

  ngOnInit(): void {
    this.initUser();

  }

  verifyLogin(){
   if(this.user.username.trim().length==0){
     alert('ingrese un usuario');
   }else if(this.user.password.trim().length==0){
    alert('ingrese un password');
   }else{
     this._authService.validateLoginUs(this.user).subscribe(res=>{
       if(res.success){
         localStorage.setItem('user',JSON.stringify(res.data));
         this.router.navigateByUrl('/auth/crud');
       }
     });
   }
  }

  initUser(){
    this.user = {
      id:0,
      idPerson:0,
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
