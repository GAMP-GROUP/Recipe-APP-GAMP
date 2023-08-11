import { createContext } from 'react';
import { ContextUser } from '../types/user.context';
import { useState } from "react";
import { UserProps } from "../types/user.props";



export const UserContext = createContext<ContextUser>({} as ContextUser );



export function UserProvider ({ children }:{children: React.ReactNode})  {
  const [user, setUser] = useState<UserProps | null>(null);
  const login = (user:UserProps ) =>{
    setUser(user)
    console.log(user);
  }

    return (
      <UserContext.Provider value={{
        user,
        login
      }} >
        <>{children}</>
      </UserContext.Provider>
    )
}

