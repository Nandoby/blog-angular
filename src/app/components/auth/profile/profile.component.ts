import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectUser } from "../shared/store/auth.selectors";
import { User } from "src/app/shared/interfaces/user.interface";
import { Observable } from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent {

  constructor(
    private store: Store
  ) {}

  user$: Observable<User|null> = this.store.select(selectUser)



}
