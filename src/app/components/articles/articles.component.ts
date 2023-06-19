import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticlesService } from '../../shared/services/articles.service';
import { Article } from '../../shared/interfaces/article/article.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  articles!: Article[];

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      if (params.has('id')) {
        this.activatedRoute.data.subscribe(
          ({ data }) => (this.articles = data)
        );
      } else {
        this.articlesService.findAllArticles().subscribe((data: Article[]) => {
          this.articles = data
        });
      }
    });
  }
}
