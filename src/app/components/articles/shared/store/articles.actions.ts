import { createAction, props } from "@ngrx/store";
import { Error } from "src/app/components/auth/shared/interfaces/error.interface";
import { Article } from "src/app/shared/interfaces/article/article.interface";

export const fetchArticlesAction = createAction(
  '[articles] fetch articles'
)
export const articlesSuccessAction = createAction(
  '[articles] articles success action',
  props<{ articles: Article[] }>()
)
export const articlesErrorAction = createAction(
  '[articles] articles error action',
  props<{ error: Error}>()
)
export const fetchArticlesByCategoryAction = createAction(
  '[articles] fetch articles by category',
  props<{id: string|null}>()
)
export const articlesByCategorySuccessAction = createAction(
  '[articles] articles by category success',
  props<{ articles: Article[]}>()
)

export const articlesByCategoryErrorAction = createAction(
  '[articles] articles by category error',
  props<{ error: Error }>()
)
