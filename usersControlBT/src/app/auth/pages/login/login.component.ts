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

  validationUser = {
    success:true,
    message:''
  };

  constructor(private _authService:UsersService,private router:Router) { }

  ngOnInit(): void {
    this.initUser();

  }


  validateUserFront(){
    const regexUser = /^[A-Za-z0-9]+$/g;
    const regexPass = /^[A-Za-z0-9-@.,]+$/g;

    this.validationUser.success=true;
    this.validationUser.message = '';
    //validate username
    if(!regexUser.test(this.trimData(this.user.username))){
      this.validationUser.success=false;
      this.validationUser.message += 'Invalid username, only admit words and number. Empty input not admitted.';
    }

    //validate password
    if(!regexPass.test(this.trimData(this.user.password))){
      this.validationUser.success=false;
      this.validationUser.message += '->Invalid password, only admit words.number and -@., .Empty input not admitted.';
    }

    //validate password length
    if(this.user.password.length<8){
      this.validationUser.success=false;
      this.validationUser.message += '->Invalid password length. Minimum lenght: 8 characters';
    }


    //in success case
    if(this.validationUser.success){
      this.validationUser.message = 'all data is correct';
    }


  }


  verifyLogin(){
   this.validateUserFront();
   if(this.validationUser.success){
    this._authService.validateLoginUs(this.user).subscribe(res=>{
      if(res.success){
        localStorage.setItem('user',JSON.stringify(res.data));
        this.router.navigateByUrl('/crud');
      }
      alert(res.message);
    });
   }
  }

  //function to trim blank spaces
  trimData(word:string){
    const char = /^\s+|\s+$/gm;
    return word.replace(char,'');
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
