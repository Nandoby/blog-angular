import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  url: string = 'http://localhost:3000/api/categories/';

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url);
  }
}
