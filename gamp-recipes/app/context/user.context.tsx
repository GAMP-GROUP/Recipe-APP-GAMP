import { ChangeEvent, ReactEventHandler, createContext } from 'react';
import { ContextUser } from '../types/user.context';
import { useState } from "react";
import { UserProps } from "../types/user.props";

export const UserContext = createContext<ContextUser>({} as ContextUser );


export function UserProvider ({ children }:{children: React.ReactNode})  {
  const [user, setUser] = useState<UserProps>({
    email: '',
    password:'',
    username: ''
});
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser: UserProps) => ({
      ...prevUser,
      [name]: value
    }));
  };
  
    return (
      <UserContext.Provider value={{
        user,
        handleInputChange
      }} >
        <>{children}</>
      </UserContext.Provider>
    )
}

