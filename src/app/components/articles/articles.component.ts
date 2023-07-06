import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticlesService } from '../../shared/services/articles.service';
import { Article } from '../../shared/interfaces/article/article.interface';
import { Store } from '@ngrx/store';
import { fetchArticlesAction, fetchArticlesByCategoryAction } from './shared/store/articles.actions';
import { selectArticles } from './shared/store/articles.selectors';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  articles$ = this.store.select(selectArticles)

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      if (params.has('id')) {
        const idCategory = params.get('id')
        this.store.dispatch(fetchArticlesByCategoryAction( { id: idCategory}))
      } else {
        this.store.dispatch(fetchArticlesAction())
      }
    });
  }
}
