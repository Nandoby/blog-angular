import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AUTH_ROUTES } from './auth.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './shared/store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './shared/store/auth.effects';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [
    RouterModule.forChild(AUTH_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature(AuthEffects)
  ],
  exports: [],
})
export class AuthModule {}
