import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared/interfaces/article/article.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  article!: Article;
  previousArticle!: Article | null;
  nextArticle!: Article | null;

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.article = data;
    });

    this.activatedRoute.data.subscribe(({ previous, next }) => {
      if (previous instanceof HttpErrorResponse) {
        this.previousArticle = null;
      } else {
        this.previousArticle = previous;
      }

      if (next instanceof HttpErrorResponse) {
        this.nextArticle = null;
      } else {
        this.nextArticle = next;
      }

    });

  }
}
