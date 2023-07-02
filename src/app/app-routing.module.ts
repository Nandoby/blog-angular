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
import { RegisterComponent } from './components/auth/register/register.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule) },
  { path: 'articles', loadChildren: () => import('./components/articles/articles.module').then((m) => m.ArticlesModule) },
  { path: 'article', loadChildren: () => import('./components/article/article.module').then((m) => m.ArticleModule) },
  { path: 'search', loadChildren: () => import('./components/search/search.module').then((m) => m.SearchModule) },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule) }
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
