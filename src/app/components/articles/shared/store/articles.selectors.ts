import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArticlesState } from "./articles.reducer";

const selectArticlesFeature = createFeatureSelector<ArticlesState>("articles")
export const selectArticles = createSelector(
  selectArticlesFeature,
  (state: ArticlesState) => state.data
)
