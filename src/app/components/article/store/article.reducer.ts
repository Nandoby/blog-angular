import { createReducer, on } from "@ngrx/store";
import { ArticleState } from "./article.selectors";
import { ArticleAPIActions } from "./article.actions";

export const initialArticleState: ArticleState = {
  data: {
    id: '',
    categories: [],
    comments: [],
    content: '',
    title: '',
    coverImage: '',
    user: {
      email: '',
      id: 0,
      username: "",
      picture: "",
      password: "",
      roles: [ 'User' ]
    }
  },
  previousArticle: {
    id: "",
    title: "",
    content: "",
    coverImage: "",
    user: {
      id: 0,
      username: "",
      email: "",
      picture: "",
      password: "",
      roles: ["User"]
    },
    comments: [],
    categories: []
  },
  nextArticle: {
    id: "",
    title: "",
    content: "",
    coverImage: "",
    user: {
      id: 0,
      username: "",
      email: "",
      picture: "",
      password: "",
      roles: ["User"]
    },
    comments: [],
    categories: []
  }
}

export const articleReducer = createReducer(
  initialArticleState,
  on(ArticleAPIActions.successArticle, (state, { article, next, previous }) => {
    return {
      ...state,
      data: article,
      nextArticle: next,
      previousArticle: previous
    }
  })
)
