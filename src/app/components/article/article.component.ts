import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Article, ArticleUpdate} from 'src/app/shared/interfaces/article/article.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BehaviorSubject, Observable, first, switchMap, of } from 'rxjs';
import { ArticlesService } from '../../shared/services/articles.service';
import {NotificationService} from "../../shared/services/notification.service";
import { Store } from '@ngrx/store';
import { ArticleAPIActions } from './store/article.actions';
import { selectArticle, selectNextArticle, selectPreviousArticle } from './store/article.selectors';

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
    private notificationService: NotificationService,
    private store: Store
  ) {}

  public article$: Observable<Article> = this.store.select(selectArticle)
  public previousArticle$: Observable<Article> = this.store.select(selectPreviousArticle)
  public nextArticle$: Observable<Article> = this.store.select(selectNextArticle)
  public isEdited!: boolean;
  public user!: User | null;
  public tinyData = ''
  public tinyConfig = {

  }
  private isEdited$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  ngOnInit() {

    this.store.dispatch(ArticleAPIActions.loadArticle())

    this.isEdited$.subscribe((edit) => (this.isEdited = edit));

    this.activatedRoute.paramMap.subscribe({
      next: () => this.store.dispatch(ArticleAPIActions.loadArticle())
    })

    this.authService.getCurrentUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  clickEdition() {
    this.isEdited$.next(true);
  }

  // confirmEdition() {
  //   const { title, id, categories, coverImage } = this.article
  //   const body: ArticleUpdate = {
  //     title,
  //     content: this.tinyData,
  //     coverImage,
  //     categories,
  //   }
  //   this.isEdited$.next(false);

  //   this.articleService.updateArticle(this.article.id, body).subscribe({
  //     next: (value) => {
  //       this.article = { ...this.article, ...value }
  //     }
  //   })

  //   this.notificationService.showNotification('La modification a bien été appliquée', 'success');

  // }
}
