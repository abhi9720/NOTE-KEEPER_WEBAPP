import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [AuthRoutingModule, InputTextModule, DividerModule, FormsModule, ReactiveFormsModule, PasswordModule]
})
export class AuthModule { }
