import { Component, OnInit } from '@angular/core';
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
  public users:Array<User>;
  public prs:Array<Person>;
  public seeUs!:User;
  public seePr!:Person;
  private auxDelete:number=0;
  private auxSee:number=0;
  private auxLogicId:number=0;

  constructor(private _userServices:UsersService) {
    this.users = [];
    this.prs = [];
   }

  ngOnInit(): void {
    this.renderUsers();
  }


  renderUsers(){
    this._userServices.getAllUsers().subscribe(res=>{

      if(res.data.length>0){
        res.data[0].forEach((item: User) => {
          this.aux = {
            id:item.id,
            idPerson:item.idPerson,
            username:item.username,
            password:'',
            rol:item.rol,
            email:item.email,
            status:item.status,
            created_at:item.created_at,
            updated_at:item.updated_at
          };
          this.users.push(this.aux);
        });
  
        res.data[1].forEach((itemp:any)=>{
          this.auxp = {
            id:itemp.data.id,
            name:itemp.data.name,
            lastname:itemp.data.lastname,
            phone:itemp.data.phone,
            direction:itemp.data.direction,
            status:itemp.data.status,
            created_at:itemp.data.created_at,
            updated_at:itemp.data.updated_at
          };
          this.prs.push(this.auxp);
        });
        
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
        }

        alert(res.message);
        
      });
    }
  }

  seeMore(id2:number){
    this.auxSee = id2;
    this.renderSee();
    
  }

  renderSee(){
    const px:any = this.prs.find(pr=>pr.id==this.auxSee);
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
