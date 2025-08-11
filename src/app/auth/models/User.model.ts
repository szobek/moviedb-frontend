export interface User {
  email?: string;
  password?: string;
  name?: string;
  approved?: boolean;
  role?: string;
  id?:string
  accessToken?:string
  refreshToken?:string
}
