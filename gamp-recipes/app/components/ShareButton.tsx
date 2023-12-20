'use client';

import React from 'react';
import { ShareBtnProps } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ShareButton({ id, setState, shareModal, btnClass }: ShareBtnProps) {
	const session = useSession();
	const router = useRouter();

	async function ShareHandle() {
		if (session.status === 'unauthenticated') {
			window.alert('You need to sign in or register in GAMP in order to favorite recipes');
			router.replace('/auth/signin');
			return;
		}

		setState(!shareModal);

	}

	return (
		<button
			id={id}
			onClick={() => ShareHandle()}
			className={btnClass }
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M10 3V5H5V19H19V14H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H10ZM17.7071 7.70711L12 13.4142L10.5858 12L16.2929 6.29289L13 3H21V11L17.7071 7.70711Z" fill="currentColor"></path></svg>		</button>
	);

}

