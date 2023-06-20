import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import {Category} from "../../shared/interfaces/category.interface";
import {ArticlesService} from "../../shared/services/articles.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  categories!: Category[]

  search: string = '';

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
