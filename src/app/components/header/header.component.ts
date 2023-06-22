import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/interfaces/category.interface';
import { ArticlesService } from '../../shared/services/articles.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private categoriesService: CategoriesService,
    private articlesService: ArticlesService,
    private router: Router,
    private authService: AuthService
  ) {}

  categories!: Category[];
  search: string = '';
  user!: User | null;
  subscription!: Subscription;

  async searchArticles() {
    await this.router.navigate(['/search'], {
      queryParams: { q: this.search },
    });
  }

  public logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: (value: Category[]) => {
        this.categories = value;
      },
    });

    this.subscription = this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
