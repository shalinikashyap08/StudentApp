import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'admin' , canActivate:[AuthGuard], data: {
      role: 'admin'
    },loadChildren: ()=>import('../app/admin/admin.module').then(m=>m.AdminModule),
  },
  {
    path:'user' , canActivate:[AuthGuard] , data: {
      role: 'user'
    },loadChildren: ()=>import('../app/user/user.module').then(m=>m.UserModule),
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
