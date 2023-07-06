import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { first, map } from "rxjs";
import { selectIsLoggedin } from "src/app/components/auth/shared/store/auth.selectors";

export const authGuard: CanActivateFn = () => {
  const store = inject(Store)
  const router = inject(Router)

  return store.select(selectIsLoggedin).pipe(
    first(),
    map((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        router.navigateByUrl('/auth/login')
        return false;
      } else {
        return true;
      }
    })
  )
}
