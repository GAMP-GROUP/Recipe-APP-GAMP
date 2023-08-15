import { ChangeEvent } from "react"



type UserProps = {
  username:string
  email: string
  password:string 
}

type ContextUser = {
  logging: boolean
  user:UserProps 
  handleLoginCardDisplay:() => void
  handleInputChange: (event:ChangeEvent<HTMLInputElement>) => void
}
