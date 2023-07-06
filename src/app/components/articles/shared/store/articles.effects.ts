import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ArticlesAction from "./articles.actions"
import { map, switchMap } from "rxjs";
import { ArticlesService } from "src/app/shared/services/articles.service";
import { Article } from "src/app/shared/interfaces/article/article.interface";

@Injectable()
export class ArticlesEffects {

  constructor(private actions$: Actions, private articlesService: ArticlesService) {}

  fetchArticlesEffect = createEffect(() => this.actions$.pipe(
    ofType(ArticlesAction.fetchArticlesAction),
    switchMap(() => {
      return this.articlesService.findAllArticles().pipe(
        map((articles: Article[]) => {
          return ArticlesAction.articlesSuccessAction({ articles })
        })
      )
    })
  ))

  fetchArticlesByCategoryEffect = createEffect(() => this.actions$.pipe(
    ofType(ArticlesAction.fetchArticlesByCategoryAction),
    switchMap(( { id }) => {
      return this.articlesService.findArticlesByCategory(id).pipe(
        map((articles: Article[]) => {
          console.log(articles)
          return ArticlesAction.articlesByCategorySuccessAction( { articles })
        })
      )
    })
  ))
}
