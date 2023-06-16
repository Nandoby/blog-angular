import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Article } from '../shared/interfaces/article.interface';
import { inject } from '@angular/core';
import { ArticlesService } from '../shared/services/articles.service';

export const articleResolver: ResolveFn<Article> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ArticlesService).findArticle(route.paramMap.get('id'));
};
