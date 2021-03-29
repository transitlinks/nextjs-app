import { combineReducers } from 'redux';
import { EnvState } from '../types/global';
import { AuthState } from '../types/auth';
import auth from './auth';
import { reduceEnv } from './global';

export type RootState = {
  auth: AuthState,
  env: EnvState
}

// COMBINED REDUCERS
export default combineReducers({
  auth,
  env: reduceEnv
});
