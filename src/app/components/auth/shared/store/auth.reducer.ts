import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/interfaces/user.interface";
import * as AuthActions from './auth.actions'
import { Error } from "../interfaces/error.interface";

export interface AuthState {
  user: User | null,
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
  }),
  on(AuthActions.currentUserAction, (state, { access_token, user }) => {
    return {
      ...state,
      user,
      access_token,
      isLoggedin: access_token ? true : false
    }
  }),
  on(AuthActions.logoutAction, (state: AuthState) => {
    localStorage.removeItem('auth')
    return {
      ...state,
      access_token: '',
      error: null,
      user: null,
      isLoggedin: false
    }
  }),
  on(AuthActions.inscriptionSuccessAction, (state: AuthState) => {
    return {
      ...state,
      error: null
    }
  }),
  on(AuthActions.inscriptionErrorAction, (state: AuthState, { error }) => {
    return {
      ...state,
      error
    }
  })
)
