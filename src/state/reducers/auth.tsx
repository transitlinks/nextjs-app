import { AuthState } from '../types/auth';
import { AuthAction } from '../actions/auth';

const reduceAuth = (state: AuthState = {
  loggedIn: false
}, action: AuthAction): AuthState => {

  switch (action.type) {
    case 'SET_AUTH':
      return action.auth;
    default:
      return state;
  }

};

export default reduceAuth;
