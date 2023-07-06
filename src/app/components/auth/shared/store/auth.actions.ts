import { createAction, props } from "@ngrx/store";
import { LoginInterface } from "src/app/shared/interfaces/auth/login.interface";
import { AuthResponse } from "src/app/shared/services/auth.service";
import { Error } from "../interfaces/error.interface";

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
