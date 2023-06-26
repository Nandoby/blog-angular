import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Article, ArticleUpdate} from 'src/app/shared/interfaces/article/article.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ArticlesService } from '../../shared/services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private articleService: ArticlesService
  ) {}

  public article!: Article;
  public previousArticle!: Article | null;
  public nextArticle!: Article | null;
  public isEdited!: boolean;
  public user!: User | null;
  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Hello, world!</p>',
  };
  private isEdited$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  ngOnInit() {
    this.isEdited$.subscribe((edit) => (this.isEdited = edit));

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
      content: this.model.editorData,
      coverImage,
      categories,
    }
    this.isEdited$.next(false);
    this.articleService.updateArticle(this.article.id, body).subscribe({
      next: (value) => {
        this.article = { ...this.article, ...value }
        console.log(this.article)
      }
    })

  }
}
