import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/interfaces/category.interface';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';
import { Store } from '@ngrx/store';
import { selectUser } from '../auth/shared/store/auth.selectors';
import { logoutAction } from '../auth/shared/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private store: Store
  ) {}

  user$!: Observable<User|null>
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
    this.store.dispatch(logoutAction())
  }

  ngOnInit() {

    this.user$ = this.store.select(selectUser)

    this.categoriesService.getCategories().subscribe({
      next: (value: Category[]) => {
        this.categories = value;
      },
    });
  }
}
