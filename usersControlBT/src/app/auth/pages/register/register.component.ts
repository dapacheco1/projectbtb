import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { Person } from '../../modules/person.module';
import { User } from '../../modules/user.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user !: User;
  public person !:Person;
  //validate name
  validationPerson = {
    success:true,
    message:''
  };

  validationUser = {
    success:true,
    message:''
  };

  constructor(private _userServices:UsersService) {
    this.initDataForm();
   }

  ngOnInit(): void {

  }

  initDataForm(){
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

    this.person = {
      idPerson:0,
      name:'',
      lastname:'',
      phone:'',
      direction:'',
      status:'A',
      created_at:'',
      updated_at:''
    };

  }

  validateClientData(){
    this.validatePersonFront();
    this.validateUserFront();
    if(this.validationPerson.success && this.validationUser.success){
      this.validatePersonBack();
    }
  }


  validatePersonFront(){
    const regexTxt = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u;
    const regexDir = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 '-]+$/u;
    const regexNum = /^\d+$/;

    this.validationPerson.success=true;
    this.validationPerson.message = '';

    if(!regexTxt.test(this.trimData(this.person.name))){
      this.validationPerson.success=false;
      this.validationPerson.message+= 'Invalid name, only admit letters,blank spaces between words. No admitted empty input \n';
    }
    //validate last name
    if(!regexTxt.test(this.trimData(this.person.lastname))){
      this.validationPerson.success=false;
      this.validationPerson.message+= 'Invalid lastname, only admit letters,blank spaces between words. No admitted empty input';
    }

    //validate phone number
    if(!regexNum.test(this.trimData(this.person.phone))){
      this.validationPerson.success=false;
      this.validationPerson.message+= 'Invalid phone number, only admit numbers. No admitted empty input';
    }

    //validate direction
    if(!regexDir.test(this.trimData(this.person.direction))){
      this.validationPerson.success=false;
      this.validationPerson.message+= ' Invalid direction, only admit letters,blank spaces,numbers between words. No admitted empty input';
    }

    //in success case
    if(this.validationPerson.success){
      this.validationPerson.message = 'all data is correct';
    }


    //validate message person
    //console.log(validationPerson.message);
  }

  validateUserFront(){
    const regexUser = /^[A-Za-z0-9]+$/g;
    const regexPass = /^[A-Za-z0-9-@.,]+$/g;
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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

    //validate mail
    if(!regexEmail.test(this.trimData(this.user.email))){
      this.validationUser.success=false;
      this.validationUser.message += '->Invalid email. Empty input not admitted.';
    }

    //validate rol
    if(this.user.rol==''){
      this.validationUser.success=false;
      this.validationUser.message += '->Invalid rol. Empty input not admitted.';
    }

    //in success case
    if(this.validationUser.success){
      this.validationUser.message = 'all data is correct';
    }


  }

  //function to trim blank spaces
  trimData(word:string){
    const char = /^\s+|\s+$/gm;
    return word.replace(char,'');
  }

  validatePersonBack(){
    this._userServices.registerUser(this.user).subscribe(res=>{
      this.validationUser.success = res.success;
      this.validationUser.message = res.message;
      if(res.success){
        alert("User was created successfully");
        this.clearForm();
      }
    });
  }

  clearForm(){
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

    this.person = {
      idPerson:0,
      name:'',
      lastname:'',
      phone:'',
      direction:'',
      status:'A',
      created_at:'',
      updated_at:''
    };
  }

}
