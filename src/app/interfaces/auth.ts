export interface User {
  userId?: number;
  email: string;
  password: string;
  roles: ['admin', 'user'];
}
