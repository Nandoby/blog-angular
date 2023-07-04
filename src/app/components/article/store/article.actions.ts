import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { pipe } from "rxjs";
import { Article } from "src/app/shared/interfaces/article/article.interface";

export const ArticleActions = createActionGroup({
  source: 'Article',
  events: {
    'Edit Article': emptyProps(),
    'Confirm Edit Article': props<{ article: Article, content: string }>(),
  }
})

export const ArticleAPIActions = createActionGroup({
  source: 'Article',
  events: {
    'Load Article': emptyProps(),
    'Success Article': props<{ article: Article, previous: Article, next: Article }>(),
    'Success Edit Article': props<{ article: Article }>(),
    'Error Edit Article': props<{ err: any}>()
  }
})
