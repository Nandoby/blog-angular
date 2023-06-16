import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private httpClient: HttpClient
  ) {}

  url: string = "http://localhost:3000/api/users"



  findAllUsers() {
    this.httpClient.get(this.url).subscribe({
      next: (value) => console.log(value)
    })
  }

}
