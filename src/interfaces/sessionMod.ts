export interface SessionMod {
  user?: User;
  expires: string;
}

export interface User {
  name: string;
  email: string;
  image: undefined | string;
  id: string;
  dni: string;
  password: undefined | string;
  register: any[];
  phone: string;
  createdAt: string;
  updatedAt: string;
}
