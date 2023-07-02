import { NgModule } from "@angular/core";
import { SearchComponent } from "./search.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { SEARCH_ROUTES } from "./search.router";

@NgModule({
  declarations: [SearchComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(SEARCH_ROUTES)
  ]
})
export class SearchModule { }
