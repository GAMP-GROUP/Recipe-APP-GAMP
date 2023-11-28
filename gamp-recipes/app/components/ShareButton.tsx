'use client';

import React from 'react';
import { ShareBtnProps } from '@/types';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';



export default function ShareButton({ id, setState, shareModal }: ShareBtnProps) {
	// const session = useSession();
	// const router = useRouter();





	async function ShareHandle() {
		// if (session.status === 'unauthenticated') {
		// 	window.alert('You need to sign in or register in GAMP in order to favorite recipes');
		// 	router.replace('/auth/signin');
		// 	return;
		// }




		setState(!shareModal);
		console.log(shareModal);


	}

	const BtnClass = 'rounded-full w-14 h-14 z-3';



	return (
		<button
			id={id}
			onClick={() => ShareHandle()}
			className={BtnClass}
		>
			<picture
				id={id}
				className='m-auto'>
				<img
					id={id}
					alt='Favorite button'
					src='/icons/share.png'
					className='w-7 h-7 m-auto'
				/>
			</picture>
		</button>
	);

}

