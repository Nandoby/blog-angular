import { createAction, props } from "@ngrx/store";
import { LoginInterface } from "src/app/shared/interfaces/auth/login.interface";
import { AuthResponse } from "src/app/shared/services/auth.service";
import { Error } from "../interfaces/error.interface";
import { User } from "src/app/shared/interfaces/user.interface";
import { Inscription } from "../interfaces/inscription.interface";

export const tryLoginAction = createAction(
  '[auth] try login',
  props<{ user: LoginInterface }>()
)
export const loginSuccessAction = createAction(
  '[auth] login success',
  props<{ auth: AuthResponse }>()
)
export const loginErrorAction = createAction(
  '[auth] login error',
  props<{ error: Error }>()
)

export const currentUserAction = createAction(
  '[auth] current user',
  props<{ access_token: string, user: User|null }>()
)

export const logoutAction = createAction(
  '[auth] logout'
)

export const tryInscriptionAction = createAction(
  '[auth] try inscription',
  props<{ user: Inscription }>()
)

export const inscriptionSuccessAction = createAction(
  '[auth] inscription success',
)

export const inscriptionErrorAction = createAction(
  '[auth] inscription error',
  props<{ error: Error}>()
)

export const userInvalidatedAction = createAction(
  '[auth] user invalidate'
)
