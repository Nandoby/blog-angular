import { Article } from "./article/article.interface"

export interface Category {
  id: number
  name: string
  articles: Article[]
}
