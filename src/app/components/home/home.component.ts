import { Component } from '@angular/core';
import { ArticlesService } from '../../shared/services/articles.service';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../../shared/interfaces/article/article.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private articlesService: ArticlesService) {}

  articles!: Article[];

  ngOnInit() {
    this.articlesService.findLastArticles(3).subscribe({
      next: (value) => (this.articles = value),
    });
  }
}
