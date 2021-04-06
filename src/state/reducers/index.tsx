import { combineReducers } from 'redux';
import { EnvState } from '../types/global';
import { AuthState } from '../types/auth';
import auth from './auth';
import header from './header';
import { reduceEnv } from './global';
import { HeaderState } from "../types/header";

export type RootState = {
  auth: AuthState,
  env: EnvState,
  header: HeaderState
}

// COMBINED REDUCERS
export default combineReducers({
  auth,
  header,
  env: reduceEnv
});
