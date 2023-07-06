import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import jwt_Decode from "jwt-decode";
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService, private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let auth = localStorage.getItem('auth');

    if (auth) {

      let authParsed = JSON.parse(auth)
      let token = authParsed.access_token

      const decodedToken = jwt_Decode(token)
      const currentTime = Date.now() / 1000;

      // @ts-ignore
      if (decodedToken.exp < currentTime) {
        this.authService.logout(true)
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

    }

    return next.handle(request);
  }
}
