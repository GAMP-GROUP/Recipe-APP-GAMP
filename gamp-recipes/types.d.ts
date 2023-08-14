import { ChangeEvent } from "react"



type UserProps = {
  username:string
  email: string
  password:string 
}

type ContextUser = {
  user:UserProps 
  handleInputChange: (event:ChangeEvent<HTMLInputElement>) => void
}
