import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HOME_ROUTES } from "./home.router";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES)
  ]
})
export class HomeModule {}
