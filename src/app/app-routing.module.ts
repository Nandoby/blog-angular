import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticleComponent } from './components/article/article.component';
import {
  articleResolver,
  nextArticleResolver,
  previousArticleResolver,
} from './resolvers/article.resolver';
import { ArticlesComponent } from './components/articles/articles.component';
import { articlesByCategoryResolver } from './resolvers/articlesByCategory.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'articles/category/:id',
    component: ArticlesComponent,
    resolve: { data: articlesByCategoryResolver },
  },
  {
    path: 'article/:id',
    component: ArticleComponent,
    resolve: {
      data: articleResolver,
      previous: previousArticleResolver,
      next: nextArticleResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
