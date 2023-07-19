import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { dataUserGuard } from "src/app/shared/guards/data-user.guard";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileGuard } from "./shared/guards/profile.guard";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    canActivate: [dataUserGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] }
    ]
  }
]
