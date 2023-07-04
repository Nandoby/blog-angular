import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Article } from "src/app/shared/interfaces/article/article.interface";

export interface ArticleState {
  data: Article,
  previousArticle: Article,
  nextArticle: Article,
  isEdited: boolean,
  error: any
}


export const selectArticleFeature = createFeatureSelector<ArticleState>("article")

export const selectArticle = createSelector(
  selectArticleFeature,
  ( state: ArticleState ): Article => {
    return state.data
  }
)

export const selectPreviousArticle = createSelector(
  selectArticleFeature,
  (state: ArticleState): Article => {
    return state.previousArticle
  }
)

export const selectNextArticle = createSelector(
  selectArticleFeature,
  (state: ArticleState): Article => {
    return state.nextArticle
  }
)

export const selectIsEdited = createSelector(
  selectArticleFeature,
  (state: ArticleState): boolean => {
    return state.isEdited
  }
)
