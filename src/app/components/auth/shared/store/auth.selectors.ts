import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

const selectAuthFeature = createFeatureSelector<AuthState>('auth')

export const selectUser = createSelector(
  selectAuthFeature,
  (state: AuthState) => state?.user
)
