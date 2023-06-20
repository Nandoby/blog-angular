import {Component, OnDestroy, OnInit} from '@angular/core';
import { ArticlesService } from '../../shared/services/articles.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Article} from "../../shared/interfaces/article/article.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private articlesService: ArticlesService,
    private router: ActivatedRoute
  ) {}

  articles: Article[] = [];
  query: string|null = ''

  ngOnInit() {
    this.router.queryParamMap.subscribe(
      (query: ParamMap) => {
        this.query = query.get('q')
        this.articlesService.searchArticle(query.get('q')).subscribe({
          next: (article) => {
            this.articles = article
          },
        });
      }
    );
  }
}
