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

	const BtnClass = 'w-fit h-8 flex justify-center items-center gap-3 p-5 text-xs font-semibold focus:outline-none hover:bg-yellow font-medium rounded-full bg-gray-white border-solid border-black';



	return (
		<button
			id={id}
			onClick={() => ShareHandle()}
			className={BtnClass}
		>
			<picture
				id={id}
				className=''>
				<img
					id={id}
					alt='Favorite button'
					src='/icons/share.png'
					className='w-fit h-5  text'
				/>
			</picture>

			Share this recipe
		</button>
	);

}

