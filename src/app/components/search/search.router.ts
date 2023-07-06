import { Routes } from "@angular/router";
import { SearchComponent } from "./search.component";
import { dataUserGuard } from "src/app/shared/guards/data-user.guard";

export const SEARCH_ROUTES: Routes = [
  {
    path: '', component: SearchComponent, canActivate: [dataUserGuard]
  }
]
