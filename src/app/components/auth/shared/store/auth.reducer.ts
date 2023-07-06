import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/interfaces/user.interface";
import * as AuthActions from './auth.actions'
import { Error } from "../interfaces/error.interface";

export interface AuthState {
  user: User,
  access_token: string;
  isLoggedin: boolean,
  error: Error|null
}

const initialState: AuthState = {
  user: {
    roles: ['User'],
    email: '',
    password: '',
    picture: '',
    username: ''
  },
  access_token: '',
  isLoggedin: false,
  error: null
}

export const authReducer = createReducer<AuthState>(
  initialState,
  on(AuthActions.loginSuccessAction, (state, { auth } ) => {
    return {
      ...state,
      user: auth.user,
      isLoggedin: true,
      access_token: auth.access_token
    }
  }),
  on(AuthActions.loginErrorAction, (state, { error }) => {
    return {
      ...state,
      error
    }
  })
)
