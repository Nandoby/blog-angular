import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tryInscriptionAction } from '../shared/store/auth.actions';
import { selectError } from '../shared/store/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public error$ = this.store.select(selectError)

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      picture: [
        '',
        Validators.pattern(
          /^(https?:\/\/)?(([a-zA-Z0-9]\.|[a-zA-Z0-9][-a-zA-Z0-9]*[a-zA-Z0-9]\.)+[a-zA-Z]{2,9}|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/
        ),
      ],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      this.store.dispatch(tryInscriptionAction({ user: this.form.getRawValue() }))
    } else {
      this.form.markAllAsTouched();
    }
  }
}
