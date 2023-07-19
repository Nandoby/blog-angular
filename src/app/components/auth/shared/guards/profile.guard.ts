import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectUser } from "../store/auth.selectors";
import { first, tap } from "rxjs";
import { User } from "src/app/shared/interfaces/user.interface";

export const ProfileGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store)
  const user = store.select(selectUser)
  let authorized = false

  user.pipe(
    first(),
    tap((user) => {
      if (user) {
        authorized = true
      }
    })
  ).subscribe()

  return authorized
}
