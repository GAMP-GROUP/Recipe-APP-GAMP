import { ChangeEvent, createContext } from 'react';
import { ContextUser } from '@/types';
import { useState } from "react";
import { UserProps } from '@/types';

export const UserContext = createContext<ContextUser>({} as ContextUser );

export function UserProvider ({ children }:{children: React.ReactNode})  {
  const [logging, setLogging] = useState(false)
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

  const handleLoginCardDisplay = () => {
    const body = document.querySelector('body')
      if (body?.classList.contains('overflow-hidden')) {
        body.classList.remove('overflow-hidden')
      } else {
        body?.classList.add('overflow-hidden')
      }
    setLogging(previousLoggingState => !previousLoggingState);
  }
    return (
      <UserContext.Provider value={{
        user,
        logging,
        handleInputChange,
        handleLoginCardDisplay,
      }} >
        <>{children}</>
      </UserContext.Provider>
    )
}
