import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Article, ArticleUpdate} from 'src/app/shared/interfaces/article/article.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BehaviorSubject, Observable, first, switchMap, of, tap, Subscription, takeLast, takeUntil, take, last, skip } from 'rxjs';
import { ArticlesService } from '../../shared/services/articles.service';
import {NotificationService} from "../../shared/services/notification.service";
import { Store } from '@ngrx/store';
import { ArticleAPIActions, ArticleActions } from './store/article.actions';
import { selectArticle, selectIsEdited, selectNextArticle, selectPreviousArticle } from './store/article.selectors';
import { selectUser } from '../auth/shared/store/auth.selectors';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit, OnDestroy {
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
  public isEdited$: Observable<boolean> = this.store.select(selectIsEdited)
  public isEdited!: boolean
  public user$ = this.store.select(selectUser)
  public user!: User|null
  public subscription = new Subscription()
  public tinyData = ''
  public tinyConfig = {}

  ngOnInit() {

    this.user$.pipe(
      first(),
      tap((user) => this.user = user)
    ).subscribe()

    this.store.dispatch(ArticleAPIActions.loadArticle())
    this.subscription.add(this.isEdited$.subscribe((value) => this.isEdited = value))
    this.activatedRoute.paramMap.subscribe({
      next: () => {
        this.store.dispatch(ArticleAPIActions.loadArticle())
      }
    })


    this.article$.pipe(
      skip(1)
    ).subscribe({
      next: (value: Article) => this.tinyData = value.content
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  clickEdition() {
    this.store.dispatch(ArticleActions.editArticle())
  }

  confirmEdition() {

    const content = this.tinyData

    this.article$.pipe(
      first(),
      tap((article: Article) => {
        this.store.dispatch(ArticleActions.confirmEditArticle({ article, content }))
      })
    ).subscribe()
  }
}
