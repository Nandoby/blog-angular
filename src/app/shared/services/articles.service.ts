import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article/article.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private httpClient: HttpClient) {}

  url: string = 'http://localhost:3000/api/articles/';

  articles$: BehaviorSubject<Article[] | null> = new BehaviorSubject<
    Article[] | null
  >(null);

  findAllArticles() {
    return this.httpClient.get<Article[]>(this.url);
  }

  findLastArticles(numberOfArticles: number) {
    return this.httpClient
      .get<Article[]>(this.url + `?lastArticles=${numberOfArticles}`);
  }

  findArticle(id: string|null) {
    return this.httpClient.get<Article>(this.url+id)
  }

  findArticlesByCategory(id: string|null) {
    return this.httpClient.get<Article[]>(this.url+'categories/'+id)
  }

  createArticle() {}

  updateArticle() {}

  removeArticle() {}

}
