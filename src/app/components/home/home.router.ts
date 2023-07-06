import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { dataUserGuard } from "src/app/shared/guards/data-user.guard";

export const HOME_ROUTES: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [dataUserGuard]
  }
]
