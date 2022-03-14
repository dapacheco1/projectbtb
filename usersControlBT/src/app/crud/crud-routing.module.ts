import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth.guard';
import { BaseCrudComponent } from './base-crud/base-crud.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';

const routes: Routes = [
  {
    path:'',
    component:BaseCrudComponent,
    children:[
      {
        path:'',
        redirectTo:'list',
        pathMatch:'full'
      },
      {
        path:'list',
        component:ListUsersComponent,
        canActivate:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class CrudRoutingModule { }
