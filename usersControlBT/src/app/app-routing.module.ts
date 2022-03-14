import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path: 'auth',
    loadChildren: () =>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'crud',
    loadChildren: () =>import('./crud/crud.module').then(m=>m.CrudModule)
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
