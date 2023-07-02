import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ArticlesService } from "src/app/shared/services/articles.service";
import { ArticleAPIActions } from "./article.actions";
import { forkJoin, map, switchMap, withLatestFrom } from "rxjs";
import { Store, select } from "@ngrx/store";
import { selectRouteParams } from "src/app/shared/store/router.selectors";

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
}
