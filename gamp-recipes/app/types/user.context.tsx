import { ChangeEvent } from "react"
import { UserProps } from "./user.props"

export type ContextUser = {
  user:UserProps  | null,
  handleInputChange: (event:ChangeEvent<HTMLInputElement>) => void
}