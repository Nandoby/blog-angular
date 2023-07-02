import { Routes } from "@angular/router";
import { ArticlesComponent } from "./articles.component";
import { articlesByCategoryResolver } from "src/app/resolvers/articlesByCategory.resolver";

export const ARTICLES_ROUTES: Routes = [
  {
    path: '', component: ArticlesComponent
  },
  {
    path: 'category/:id',
    component: ArticlesComponent,
    resolve: { data: articlesByCategoryResolver}
  }
]
