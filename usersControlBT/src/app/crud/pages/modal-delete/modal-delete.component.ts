import { Component, OnInit } from '@angular/core';
import { ListUsersComponent } from '../list-users/list-users.component';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  constructor(private listComp:ListUsersComponent) { }

  ngOnInit(): void {
  }

  delete(){
    this.listComp.deleteUser();
  }


}
