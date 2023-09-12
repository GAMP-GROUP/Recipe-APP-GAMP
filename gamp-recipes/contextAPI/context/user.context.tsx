import { ChangeEvent, createContext } from 'react';
import { ContextUser } from '@/types';
import { useState } from 'react';
import { UserProps } from '@/types';
import React from 'react';

export const UserContext = createContext<ContextUser>({} as ContextUser);

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [registering, setRegistering] = useState(false);

	const [user, setUser] = useState<UserProps>({
		email: '',
		password: '',
		nationality: '',
		username: '',
	});

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setUser((prevUser: UserProps) => ({
			...prevUser,
			[name]: value,
		}));
	};

	const handleLoginCardDisplay = () => {
		const body = document.querySelector('body');
		if (body?.classList.contains('overflow-hidden')) {
			body.classList.remove('overflow-hidden');
		} else {
			body?.classList.add('overflow-hidden');
		}
		setRegistering((previousRegisteringState) => !previousRegisteringState);
	};
	return (
		<UserContext.Provider
			value={{
				user,
				registering,
				handleInputChange,
				handleLoginCardDisplay,
			}}
		>
			<>{children}</>
		</UserContext.Provider>
	);
}
