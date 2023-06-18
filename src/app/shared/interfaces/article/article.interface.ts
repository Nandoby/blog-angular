import { Category } from "../category.interface"
import { User } from "../user.interface"
import { Comment } from "../comment.interface"

export interface Article {
  id: string
  title: string
  content: string
  coverImage: string
  user: User
  comments: Comment[]
  categories: Category[]
}
