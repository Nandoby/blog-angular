import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectUser } from "../store/auth.selectors";
import { first, tap } from "rxjs";
import { User } from "src/app/shared/interfaces/user.interface";

export const ProfileGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store)
  const user = store.select(selectUser)
  const router = inject(Router)

  user.pipe(
    first(),
    tap((user) => {
      if (user !== null) {
        return true
      } else {
        router.navigateByUrl('/')
        return false
      }
    })
  ).subscribe()

  return true

}
