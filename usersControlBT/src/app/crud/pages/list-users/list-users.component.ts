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

  constructor(private _userServices:UsersService) {
    this.users = [];
    this.prs = [];
   }

  ngOnInit(): void {
    this.renderUsers();
  }


  renderUsers(){
    this._userServices.getAllUsers().subscribe(res=>{
      res.data[0].forEach((item: User) => {
        this.aux = {
          id:item.id,
          idPerson:item.id,
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

      res.data[1].forEach((item:Person)=>{
        this.auxp = {
          id:item.id,
          name:item.name,
          lastname:item.lastname,
          phone:item.phone,
          direction:item.direction,
          status:item.status,
          created_at:item.created_at,
          updated_at:item.updated_at
        };
        this.prs.push(this.auxp);
      });
    });
  }


  deleteUser(){
    this.users.splice(0,1);
  }

 

 

}
