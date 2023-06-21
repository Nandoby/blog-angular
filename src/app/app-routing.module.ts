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
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticlesComponent },
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
  { path: 'search', component: SearchComponent },
  { path: 'auth', children: [{ path: 'login', component: LoginComponent }] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
