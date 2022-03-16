import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/auth/modules/person.module';
import { User } from 'src/app/auth/modules/user.module';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  
  public resp!:any;
  public aux!:User;
  public auxp!:Person;
  public users:Array<User> = [];
  public prs:Array<Person>;
  public seeUs!:User;
  public seePr!:Person;
  public editUs!:User;
  public editPr!:Person;
  private auxDelete:number=0;
  private auxSee:number=0;
  private auxEdit:number=0;
  private auxLogicId:number=0;

  public userI!:User;
  public personI!:Person;

  public userEd!:User;
  public personEd!:Person;
  //validate name
  validationPerson = {
    success:true,
    message:''
  };

  validationUser = {
    success:true,
    message:''
  };

  constructor(private _userServices:UsersService,private router:Router) {
    this.users = [];
    this.prs = [];
   }

  ngOnInit(): void {
    this.initDataForm();
    this.renderUsers();
  }

  validateClientData(){
    this.validatePersonFront();
    this.validateUserFront();
    if(this.validationPerson.success && this.validationUser.success){
      this.validateUserBack();
    }
  }

  validateClientDataUpdate(){
    this.validatePersonFrontUp();
    this.validateUserFrontUp();

    if(this.validationPerson.success && this.validationUser.success){
      this.validateUserBackUp();
    }
  }


  validatePersonFront(){
    const regexTxt = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u;
    const regexDir = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 '-]+$/u;
    const regexNum = /^\d+$/;

    this.validationPerson.success=true;
    this.validationPerson.message = '';

    if(!regexTxt.test(this.trimData(this.personI.name))){
      this.validationPerson.success=false;
      this.validationPerson.message+= 'Invalid name, only admit letters,blank spaces between words. No admitted empty input \n';
    }
    //validate last name
    if(!regexTxt.test(this.trimData(this.personI.lastname))){
      this.validationPerson.success=false;
      this.validationPerson.message+= 'Invalid lastname, only admit letters,blank spaces between words. No admitted empty input';
    }

    //in success case
    if(this.validationPerson.success){
      this.validationPerson.message = 'all data is correct';
    }
  }

  validateUserFront(){
    const regexUser = /^[A-Za-z0-9]+$/g;
    const regexPass = /^[A-Za-z0-9-@.,]+$/g;
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    this.validationUser.success=true;
    this.validationUser.message = '';
    //validate username
    if(!regexUser.test(this.trimData(this.userI.username))){
      this.validationUser.success=false;
      this.validationUser.message += 'Invalid username, only admit words and number. Empty input not admitted.';
    }

    //validate password
    if(!regexPass.test(this.trimData(this.userI.password))){
      this.validationUser.success=false;
      this.validationUser.message += '->Invalid password, only admit words.number and -@., .Empty input not admitted.';
    }

    //validate password length
    if(this.userI.password.length<8){
      this.validationUser.success=false;
      this.validationUser.message += '->Invalid password length. Minimum lenght: 8 characters';
    }

    //validate mail
    if(!regexEmail.test(this.trimData(this.userI.email))){
      this.validationUser.success=false;
      this.validationUser.message += '->Invalid email. Empty input not admitted.';
    }

    //validate rol
    if(this.userI.rol==''){
      this.validationUser.success=false;
      this.validationUser.message += '->Invalid rol. Empty input not admitted.';
    }

    //in success case
    if(this.validationUser.success){
      this.validationUser.message = 'all data is correct';
    }


  }

  validatePersonFrontUp(){
    const regexTxt = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/u;
    const regexDir = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 '-]+$/u;
    const regexNum = /^\d+$/;

    this.validationPerson.success=true;
    this.validationPerson.message = '';

    if(!regexTxt.test(this.trimData(this.personEd.name))){
      this.validationPerson.success=false;
      this.validationPerson.message+= 'Invalid name, only admit letters,blank spaces between words. No admitted empty input \n';
    }
    //validate last name
    if(!regexTxt.test(this.trimData(this.personEd.lastname))){
      this.validationPerson.success=false;
      this.validationPerson.message+= 'Invalid lastname, only admit letters,blank spaces between words. No admitted empty input';
    }

    //in success case
    if(this.validationPerson.success){
      this.validationPerson.message = 'all data is correct';
    }
  }

  validateUserFrontUp(){
    const regexUser = /^[A-Za-z0-9]+$/g;
    const regexPass = /^[A-Za-z0-9-@.,]+$/g;
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    this.validationUser.success=true;
    this.validationUser.message = '';
    //validate username
    if(!regexUser.test(this.trimData(this.userEd.username))){
      this.validationUser.success=false;
      this.validationUser.message += 'Invalid username, only admit words and number. Empty input not admitted.';
    }

    //validate password
    if(!regexPass.test(this.trimData(this.userEd.password))){
      this.validationUser.success=false;
      this.validationUser.message += '->Invalid password, only admit words.number and -@., .Empty input not admitted.';
    }

    //validate password length
    if(this.userEd.password.length<8){
      this.validationUser.success=false;
      this.validationUser.message += '->Invalid password length. Minimum lenght: 8 characters';
    }

    //validate mail
    if(!regexEmail.test(this.trimData(this.userEd.email))){
      this.validationUser.success=false;
      this.validationUser.message += '->Invalid email. Empty input not admitted.';
    }

    //validate rol
    if(this.userEd.rol==''){
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

  validateUserBack(){
    let us = {
      user:this.userI,
      person:this.personI
    }
    this._userServices.registerUser(us).subscribe(res=>{
      this.validationUser.success = res.success;
      this.validationUser.message = res.message;
      if(res.success){
        alert("Account was created successfully");
        this.clearForm();
        this.renderUsers();
      }
    });
  }

  validateUserBackUp(){
    let us = {
      user:this.userEd,
      person:this.personEd
    }

    this._userServices.updateUser(us).subscribe(res=>{
      this.validationUser.success = res.success;
      this.validationUser.message = res.message;
      if(res.success){
        alert("Account was updated successfully");
        this.clearForm();
        this.renderUsers();
      }
    });
  }

  clearForm(){
    this.userI = {
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

    this.personI = {
      id:0,
      name:'',
      lastname:'',
      phone:'',
      direction:'',
      status:'A',
      created_at:'',
      updated_at:''
    };

    this.userEd = {
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

    this.personEd = {
      id:0,
      name:'',
      lastname:'',
      phone:'',
      direction:'',
      status:'A',
      created_at:'',
      updated_at:''
    };
  }



  initDataForm(){
    this.userI = {
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

    this.personI = {
      id:0,
      name:'',
      lastname:'',
      phone:'',
      direction:'',
      status:'A',
      created_at:'',
      updated_at:''
    };

    this.userEd = {
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

    this.personEd = {
      id:0,
      name:'',
      lastname:'',
      phone:'',
      direction:'',
      status:'A',
      created_at:'',
      updated_at:''
    };

  }

  renderUsers(){
    this.users=[];
    this.prs=[];
    this._userServices.getAllUsers().subscribe(res=>{
      if(res.success){
        this.users = res.data;
        this.users.forEach((item:any)=>this.prs.push(item.person));
      }
    });
  }

  deleteUser(logicId:number,userId:number){
    this.auxDelete = userId;
    this.auxLogicId = logicId;
  }

  confirmDelete(){
    if(this.auxDelete>=0){
      this._userServices.deleteUserById(this.auxDelete).subscribe(res=>{
        if(res.success){
          this.users.splice(this.auxLogicId,1);
          this.renderUsers();
        }

        alert(res.message);

      });
    }
  }

  seeMore(id2:number){
    this.auxSee = id2;
    this.renderSee();

  }

  edit(idP:number){
    // this.auxEdit = idP;
    // this.renderEdit();
 
    this._userServices.find(idP, 'A')
    .subscribe((res) => {
      if(res.success){
        this.userEd.id = res.data.id;
        this.userEd.rol = res.data.rol;
        this.userEd.username = res.data.username;
        this.userEd.email = res.data.email;

        this.personEd.id = res.data.person.id;
        this.personEd.name = res.data.person.name;
        this.personEd.lastname = res.data.person.lastname;
        this.personEd.phone = res.data.person.phone;
      }
    })
  }



  renderSee(){
    const px:any = this.prs.find(pr=>pr.id==this.auxSee);
    console.log(this.prs);
    
    const ux:any = this.users.find(us=>us.idPerson == this.auxSee);
    this.seeUs ={
      id:ux.id,
      idPerson:ux.idPerson,
      rol:ux.rol,
      username:ux.username,
      password:'',
      email:ux.email,
      status:ux.status,
      created_at:ux.created_at,
      updated_at:ux.updated_at
    }

    this.seePr = {
      id:px.id,
      name:px.name,
      lastname:px.lastname,
      phone:px.phone,
      direction:px.direction,
      status:px.status,
      created_at:px.created_at,
      updated_at:px.updated_at
    };



  }




}
