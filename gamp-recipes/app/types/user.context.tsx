import { UserProps } from "./user.props"

export type ContextUser = {
  user:UserProps  | null,
  login: (user:UserProps) => void
}