import { Component, OnInit } from '@angular/core';
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

  constructor() {
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

  validateData(){
    this.validateUserFront();
  }


  validateUserFront(){
    const regexTxt = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u;
    const regexDir = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 '-]+$/u;
    const regexUsname = /^[A-Za-z0-9 ]+$/g;
    const regexNum = /^\d+$/;

    //validate name
    let validationPerson = {
      success:true,
      message:''
    };
    if(!regexTxt.test(this.trimData(this.person.name))){
      validationPerson.success=false;
      validationPerson.message+= ' Invalid name, only admit letters,blank spaces between words. No admitted empty input';
    }
    //validate last name
    if(!regexTxt.test(this.trimData(this.person.lastname))){
      validationPerson.success=false;
      validationPerson.message+= '->Invalid lastname, only admit letters,blank spaces between words. No admitted empty input';
    }

    //validate phone number
    if(!regexNum.test(this.trimData(this.person.phone))){
      validationPerson.success=false;
      validationPerson.message+= '->Invalid phone number, only admit numbers. No admitted empty input';
    }

    //validate direction
    if(!regexDir.test(this.trimData(this.person.direction))){
      validationPerson.success=false;
      validationPerson.message+= '->Invalid direction, only admit letters,blank spaces,numbers between words. No admitted empty input';
    }

    //validate
    alert(validationPerson.message);
  }

  //function to trim blank spaces
  trimData(word:string){
    const char = /^\s+|\s+$/gm;
    console.log(word.replace(char,''));
    return word.replace(char,'');
  }


}
