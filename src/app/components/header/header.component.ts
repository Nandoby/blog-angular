import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from '../../shared/services/categories.service';
import {Category} from "../../shared/interfaces/category.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private categoriesService: CategoriesService
  ) {}

  categories!: Category[]

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: (value: Category[]) => {
        this.categories = value
      }
    })
  }
}
