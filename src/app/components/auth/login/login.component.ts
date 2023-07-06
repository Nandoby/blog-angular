import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tryLoginAction } from '../shared/store/auth.actions';
import { selectUser } from '../shared/store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public user$ = this.store.select(selectUser)

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(tryLoginAction( { user: this.loginForm.getRawValue() }));
    }


    // if (this.loginForm.valid) {
    //   this.authService.login(this.loginForm.value).subscribe({
    //     next: (success) => {
    //       this.router.navigate(['/'])
    //     },
    //     error: (error) => console.log('Erreur de connexion'),
    //   });
    // } else {
    //   this.loginForm.markAllAsTouched()
    // }
  }
}
