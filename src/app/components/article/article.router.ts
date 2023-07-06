import { Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import {
  articleResolver,
  nextArticleResolver,
  previousArticleResolver,
} from 'src/app/resolvers/article.resolver';
import { dataUserGuard } from 'src/app/shared/guards/data-user.guard';

export const ARTICLE_ROUTES: Routes = [
  {
    path: ':id',
    component: ArticleComponent,
    canActivate: [dataUserGuard]
  },
];
