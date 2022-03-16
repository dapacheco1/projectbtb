import { Person } from "./person.module"

export interface User{
  id:number,
  idPerson:number,
  rol:string,
  username:string,
  password:string,
  email:string,
  status:string,
  created_at:string,
  updated_at:string,
  person?: Person
}
