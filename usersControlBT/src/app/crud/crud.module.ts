import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { BaseCrudComponent } from './base-crud/base-crud.component';
import { HeaderCrudComponent } from './components/header-crud/header-crud.component';
import { ModalUserComponent } from './pages/modal-user/modal-user.component';
import { ModalEditComponent } from './pages/modal-edit/modal-edit.component';
import { ModalSeeComponent } from './pages/modal-see/modal-see.component';
import { ModalDeleteComponent } from './pages/modal-delete/modal-delete.component';


@NgModule({
  declarations: [
    ListUsersComponent,
    BaseCrudComponent,
    HeaderCrudComponent,
    ModalUserComponent,
    ModalEditComponent,
    ModalSeeComponent,
    ModalDeleteComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule
  ]
})
export class CrudModule { }
