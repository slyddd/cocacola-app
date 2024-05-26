export interface LoginInterface {
  user: User;
  accessToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
