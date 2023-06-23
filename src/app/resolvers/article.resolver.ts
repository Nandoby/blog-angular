import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Article } from '../shared/interfaces/article/article.interface';
import { inject } from '@angular/core';
import { ArticlesService } from '../shared/services/articles.service';
import {Observable, catchError, first, of, switchMap} from "rxjs";

export const articleResolver: ResolveFn<Article> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ArticlesService).findArticle(route.paramMap.get('id'));
};

export const previousArticleResolver: ResolveFn<Article|null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let id = Number(route.paramMap.get('id')) - 1
  let articleService = inject(ArticlesService)
  return articleService.getTotalArticles().pipe(
    switchMap(totalArticles => tryFindArticle(articleService, id, -1, totalArticles))
  )
};

export const nextArticleResolver: ResolveFn<Article|null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let id = Number(route.paramMap.get('id')) + 1
  let articleService = inject(ArticlesService)
  return articleService.getTotalArticles().pipe(
    switchMap(totalArticles => tryFindArticle(articleService, id, +1, totalArticles))
  )
};

function tryFindArticle(articleService: ArticlesService, id: number, increment: number, totalArticles: number): Observable<Article|null> {

  if (id < 1 || id > totalArticles) {
    console.log('deuxieme')
    return of(null)
  }

  return articleService.findArticle(id.toString()).pipe(
    catchError(() => {
      return tryFindArticle(articleService, id + increment, increment, totalArticles)
    })
  )
}
