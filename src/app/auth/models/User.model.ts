export interface User {
    email:string;
    password:string;
    name?:string;
  approved?:boolean;
  roles?:string[];

}