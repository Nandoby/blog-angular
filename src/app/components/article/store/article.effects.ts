import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ArticlesService } from "src/app/shared/services/articles.service";
import { ArticleAPIActions, ArticleActions } from "./article.actions";
import { catchError, forkJoin, map, switchMap, withLatestFrom, of, tap } from "rxjs";
import { Store, select } from "@ngrx/store";
import { selectRouteParams } from "src/app/shared/store/router.selectors";
import { Article } from "src/app/shared/interfaces/article/article.interface";

@Injectable()
export class ArticleEffects {

  constructor(private actions$: Actions, private articleService: ArticlesService, private store: Store) {}

  loadArticle$ = createEffect(() => this.actions$.pipe(
    ofType(ArticleAPIActions.loadArticle),
    withLatestFrom(this.store.pipe(select(selectRouteParams))),
    switchMap(([action, params]) => {
      const id = params['id'];
      return forkJoin({
        article: this.articleService.findArticle(id),
        previousArticle: this.articleService.previousArticle(id),
        nextArticle: this.articleService.nextArticle(id)
      }).pipe(
        map(({ article, previousArticle, nextArticle}) => ArticleAPIActions.successArticle({ article, next: nextArticle, previous: previousArticle }))
      )
    })
  ))

  editArticle = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.confirmEditArticle),
    switchMap(({ article, content }) => this.articleService.updateArticle(article.id, { ...article, content }).pipe(
      map((article: Article) => ArticleAPIActions.successEditArticle({ article })),
      catchError((err: any) => of(ArticleAPIActions.errorEditArticle({ err })))
    ))
  ))
}
