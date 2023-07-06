import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/interfaces/category.interface';
import { ArticlesService } from '../../shared/services/articles.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Observable, Subscription, filter, first, tap } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';
import { Store } from '@ngrx/store';
import { selectUser } from '../auth/shared/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    private articlesService: ArticlesService,
    private router: Router,
    private store: Store
  ) {}

  user$ = this.store.select(selectUser)
  categories!: Category[];
  search: string = '';
  subscription!: Subscription;

  async searchArticles() {
    await this.router.navigate(['/search'], {
      queryParams: { q: this.search },
    });
  }

  public logout() {
    // this.authService.logout();
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: (value: Category[]) => {
        this.categories = value;
      },
    });
  }
}
