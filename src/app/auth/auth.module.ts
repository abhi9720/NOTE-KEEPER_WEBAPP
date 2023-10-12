import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
 
const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [AuthRoutingModule, FormsModule,ReactiveFormsModule]
})
export class AuthModule {}
