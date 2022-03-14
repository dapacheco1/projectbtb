import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { BaseCrudComponent } from './base-crud/base-crud.component';
import { HeaderCrudComponent } from './components/header-crud/header-crud.component';


@NgModule({
  declarations: [
    ListUsersComponent,
    BaseCrudComponent,
    HeaderCrudComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule
  ]
})
export class CrudModule { }
