import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginInterface} from "../interfaces/auth/login.interface";
import {tap} from "rxjs";

interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginURL: string = 'http://localhost:3000/api/auth/login'
  registerURL: string = 'http://localhost:3000/api/auth/register'

  constructor(private httpClient: HttpClient) { }

  login(user: any) {
    return this.httpClient.post<AuthResponse>(this.loginURL, user).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access_token)
      })
    )
  }

}
