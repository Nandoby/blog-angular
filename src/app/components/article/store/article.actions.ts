import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { pipe } from "rxjs";
import { Article } from "src/app/shared/interfaces/article/article.interface";

export const ArticleActions = createActionGroup({
  source: 'Article',
  events: {
    'Edit Article': emptyProps()
  }
})

export const ArticleAPIActions = createActionGroup({
  source: 'Article',
  events: {
    'Load Article': emptyProps(),
    'Success Article': props<{ article: Article, previous: Article, next: Article }>()
  }
})
