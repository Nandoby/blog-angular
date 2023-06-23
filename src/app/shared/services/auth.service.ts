import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInterface } from '../interfaces/auth/login.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RegisterInterface } from '../interfaces/auth/register.interface';
import { User } from '../interfaces/user.interface';

interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    email: string;
    picture: string;
    roles: ['User', 'Admin'];
  };
}

interface RegisterResponse {
  username: string;
  email: string;
  roles: ['user', 'admin'];
  id: number;
  picture: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginURL: string = 'http://localhost:3000/api/auth/login';
  registerURL: string = 'http://localhost:3000/api/auth/register';

  constructor(private httpClient: HttpClient) {}

  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    this.getUser()
  );

  public getCurrentUser() {
    return this.user.asObservable();
  }

  login(user: LoginInterface): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.loginURL, user).pipe(
      tap((res: AuthResponse) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.user.next(this.getUser());
      })
    );
  }

 private getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  register(user: RegisterInterface) {
    return this.httpClient.post<RegisterResponse>(this.registerURL, user);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.user.next(null);
  }
}
