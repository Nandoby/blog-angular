import { NgModule } from "@angular/core";
import { ArticlesComponent } from "./articles.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ARTICLES_ROUTES } from "./articles.router";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ARTICLES_ROUTES)
  ]
})
export class ArticlesModule {}
