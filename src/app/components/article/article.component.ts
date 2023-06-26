import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared/interfaces/article/article.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BehaviorSubject, tap } from 'rxjs';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {}

  public article!: Article;
  public previousArticle!: Article | null;
  public nextArticle!: Article | null;
  public isEdited!: boolean
  public user!: User|null
  private isEdited$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public Editor = ClassicEditor

  ngOnInit() {

    this.isEdited$.subscribe((edit) => this.isEdited = edit)

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
      next: (user) => this.user = user
    })

  }

  clickEdition() {
    this.isEdited$.next(true)
  }

  confirmEdition() {
    this.isEdited$.next(false)
  }


}
