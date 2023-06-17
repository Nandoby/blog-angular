import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticleComponent } from './components/article/article.component';
import {
  articleResolver,
  nextArticleResolver,
  previousArticleResolver,
} from './resolvers/article.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
