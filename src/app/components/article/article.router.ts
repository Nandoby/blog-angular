import { Routes } from "@angular/router";
import { ArticleComponent } from "./article.component";
import { articleResolver, nextArticleResolver, previousArticleResolver } from "src/app/resolvers/article.resolver";

export const ARTICLE_ROUTES: Routes = [
  {
    path: ':id', component: ArticleComponent, resolve: {
      data: articleResolver,
      previous: previousArticleResolver,
      next: nextArticleResolver
    }
  }
]
