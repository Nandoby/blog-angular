import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared/interfaces/article/article.interface';
import { ArticlesService } from 'src/app/shared/services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  constructor (
    private activatedRoute: ActivatedRoute
  ) {}

  article!: Article

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.article = data
    })
  }
}
