import { EnvState } from '../types/global';

export const reduceEnv = (state: EnvState = {}): EnvState => {
  console.log('reduce env', state);
  return state;
};
