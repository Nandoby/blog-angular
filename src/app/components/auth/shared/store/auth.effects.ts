import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from './auth.actions'
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  tryConnexionEffect = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.tryLoginAction),
    switchMap(({ user }) => {
      return this.authService.login(user).pipe(
        map((auth) => {
          return AuthActions.loginSuccessAction({ auth })
        }),
        catchError((error) => of(AuthActions.loginErrorAction({error})))
      )
    })
  ))

}
