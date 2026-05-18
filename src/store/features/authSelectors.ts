import type { RootState } from '../store';

export type AuthStatus = 'unknown' | 'authorized' | 'unauthorized';

export const selectAuthStatus = (state: RootState): AuthStatus => {
  if (!state.auth.authInitialized) {
    return 'unknown';
  }

  return state.auth.accessToken ? 'authorized' : 'unauthorized';
};

export const selectIsAuthorized = (state: RootState) =>
  selectAuthStatus(state) === 'authorized';
