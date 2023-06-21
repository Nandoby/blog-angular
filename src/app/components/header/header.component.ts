import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import {Category} from "../../shared/interfaces/category.interface";
import {ArticlesService} from "../../shared/services/articles.service";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

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
    private authService: AuthService
  ) {}

  categories!: Category[]

  search: string = '';

  isLoggedIn: boolean = this.authService.loggedIn

  async searchArticles() {
    await this.router.navigate(['/search'], {
      queryParams: { q: this.search }
    })
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: (value: Category[]) => {
        this.categories = value
      }
    })
  }
}
