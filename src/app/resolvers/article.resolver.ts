import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Article } from '../shared/interfaces/article/article.interface';
import { inject } from '@angular/core';
import { ArticlesService } from '../shared/services/articles.service';
import {catchError, of} from "rxjs";

export const articleResolver: ResolveFn<Article> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ArticlesService).findArticle(route.paramMap.get('id'));
};

export const previousArticleResolver: ResolveFn<Article> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ArticlesService).findArticle((Number(route.paramMap.get('id')) - 1).toString()).pipe(
    catchError(err => {
      return of(err)
    })
  );
};

export const nextArticleResolver: ResolveFn<Article> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ArticlesService).findArticle((Number(route.paramMap.get('id')) + 1).toString()).pipe(
    catchError(err => {
      return of(err)
    })
  );
};
