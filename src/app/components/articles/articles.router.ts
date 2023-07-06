import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { articlesByCategoryResolver } from 'src/app/resolvers/articlesByCategory.resolver';
import { dataUserGuard } from 'src/app/shared/guards/data-user.guard';

export const ARTICLES_ROUTES: Routes = [
  {
    path: '',
    canActivate: [dataUserGuard],
    children: [
      {
        path: '',
        component: ArticlesComponent,
      },
      {
        path: 'category/:id',
        component: ArticlesComponent,
      },
    ],
  },
];
