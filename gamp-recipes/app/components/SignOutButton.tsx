import React from 'react';

type TSignOutButtonProps = {
    signOut: () => void,
}

export default function SignOutButton({ signOut }: TSignOutButtonProps) {
	return (
		<button
			onClick={ () => signOut() }
			className='text-sm font-semibold px-5 py-1 bg-black text-white rounded-2xl'
		>
						Sign Out
		</button>
	);
}