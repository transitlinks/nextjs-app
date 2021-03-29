export interface User {
  uuid: string;
  name: string;
  avatar: string;
  photo: string;
}

export interface AuthState {
  user?: User;
  loggedIn: boolean;
}
