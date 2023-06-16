import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private httpClient: HttpClient) {}

  url: string = 'http://localhost:3000/api/articles';

  articles$: BehaviorSubject<Article[] | null> = new BehaviorSubject<
    Article[] | null
  >(null);

  findAllArticles() {
    this.httpClient.get<Article[]>(this.url).subscribe({
      next: (value) => this.articles$.next(value),
    });
  }

  findLastArticles(numberOfArticles: number) {
    return this.httpClient
      .get<Article[]>(this.url + `?lastArticles=${numberOfArticles}`);
  }


}
