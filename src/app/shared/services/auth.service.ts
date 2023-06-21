import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginInterface} from "../interfaces/auth/login.interface";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {RegisterInterface} from "../interfaces/auth/register.interface";

interface AuthResponse {
  access_token: string;
}

interface RegisterResponse {
  username: string
  email: string
  roles: ["user", "admin"],
  id: number
  picture: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginURL: string = 'http://localhost:3000/api/auth/login'
  registerURL: string = 'http://localhost:3000/api/auth/register'

  constructor(private httpClient: HttpClient) { }

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken())

  hasToken(): boolean {
    return !!localStorage.getItem('access_token')
  }

  public get isLoggedIn() {
    return this.loggedIn.asObservable()
  }

  login(user: LoginInterface): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.loginURL, user).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access_token);
        this.loggedIn.next(true)
      })
    )
  }

  register(user: RegisterInterface) {
    return this.httpClient.post<RegisterResponse>(this.registerURL, user)
  }

  logout() {
    localStorage.removeItem('access_token')
    this.loggedIn.next(false);
  }

}
