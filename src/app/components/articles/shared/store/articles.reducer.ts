import { Error } from 'src/app/components/auth/shared/interfaces/error.interface';
import { createReducer, on } from '@ngrx/store';
import * as ArticlesAction from './articles.actions';
import { Article } from 'src/app/shared/interfaces/article/article.interface';

export interface ArticlesState {
  data: Article[] | null;
  error: Error | null;
}

const intialState: ArticlesState = {
  data: null,
  error: null,
};

export const articlesReducer = createReducer(
  intialState,
  on(
    ArticlesAction.articlesSuccessAction,
    (state: ArticlesState, { articles }: { articles: Article[] }) => {
      return {
        ...state,
        data: articles,
        error: null,
      };
    }
  ),
  on(ArticlesAction.articlesErrorAction, (state: ArticlesState, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(ArticlesAction.articlesByCategorySuccessAction, (state: ArticlesState, { articles }) => {
    return {
      ...state,
      data: articles
    }
  }),
  on(ArticlesAction.articlesByCategoryErrorAction, (state: ArticlesState, { error }) => {
    return {
      ...state,
      error
    }
  })
);
