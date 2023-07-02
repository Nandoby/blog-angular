import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AUTH_ROUTES } from './auth.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    RouterModule.forChild(AUTH_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [],
})
export class AuthModule {}
