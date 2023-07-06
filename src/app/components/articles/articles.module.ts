import { NgModule } from "@angular/core";
import { ArticlesComponent } from "./articles.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ARTICLES_ROUTES } from "./articles.router";
import { SharedModule } from "src/app/shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { articleReducer } from "../article/store/article.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ArticlesEffects } from "./shared/store/articles.effects";
import { articlesReducer } from "./shared/store/articles.reducer";

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ARTICLES_ROUTES),
    StoreModule.forFeature("articles", articlesReducer),
    EffectsModule.forFeature(ArticlesEffects)
  ]
})
export class ArticlesModule {}
