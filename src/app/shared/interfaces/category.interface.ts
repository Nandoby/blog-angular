import { Article } from "./article.interface"

export interface Category {
  id: number
  name: string
  articles: Article[]
}
