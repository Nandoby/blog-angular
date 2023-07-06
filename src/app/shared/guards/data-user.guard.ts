import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs";
import { selectUser } from "src/app/components/auth/shared/store/auth.selectors";
import { User } from "../interfaces/user.interface";
import { currentUserAction } from "src/app/components/auth/shared/store/auth.actions";

interface Auth {
  access_token: string;
  user: User
}

export const dataUserGuard: CanActivateFn = () => {

  const store = inject(Store)
  const isAuth = localStorage.getItem('auth')

  if (isAuth) {
    const auth = JSON.parse(isAuth)
    const token = auth.access_token
    const user = auth.user

    store.dispatch(currentUserAction( { access_token: token, user }))

    return true

  } else {
    store.dispatch(currentUserAction( { access_token: '', user: null }))
    return true
  }



}
