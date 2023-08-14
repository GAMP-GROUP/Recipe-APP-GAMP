import { ChangeEvent } from "react"
import { UserProps } from "./user.props"


type UserProps = {
  username:string
  email: string
  password:string 
}

type ContextUser = {
  user:UserProps  | null,
  handleInputChange: (event:ChangeEvent<HTMLInputElement>) => void
}
