import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Article, ArticleUpdate} from 'src/app/shared/interfaces/article/article.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { ArticlesService } from '../../shared/services/articles.service';
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private articleService: ArticlesService,
    private notificationService: NotificationService
  ) {}

  public article!: Article;
  public previousArticle!: Article | null;
  public nextArticle!: Article | null;
  public isEdited!: boolean;
  public user!: User | null;
  public tinyData = ''
  public tinyConfig = {

  }
  private isEdited$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  ngOnInit() {
    this.isEdited$.subscribe((edit) => (this.isEdited = edit));

    this.activatedRoute.data.subscribe(({ data }) => {
      this.article = data;
      this.tinyData = this.article.content
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

    this.authService.getCurrentUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  clickEdition() {
    this.isEdited$.next(true);
  }

  confirmEdition() {
    const { title, id, categories, coverImage } = this.article
    const body: ArticleUpdate = {
      title,
      content: this.tinyData,
      coverImage,
      categories,
    }
    this.isEdited$.next(false);

    this.articleService.updateArticle(this.article.id, body).subscribe({
      next: (value) => {
        this.article = { ...this.article, ...value }
      }
    })

    this.notificationService.showNotification('La modification a bien été appliquée', 'success');

  }
}
