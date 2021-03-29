import { AuthState } from '../types/auth';
import { Action, DispatchAction } from './';

export interface AuthAction extends Action {
  auth: AuthState
}

export const setAuth = (auth: AuthState) => (dispatch: DispatchAction<AuthAction>) => {
  return dispatch({ type: 'SET_AUTH', auth });
};
