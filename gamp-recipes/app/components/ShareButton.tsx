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
		console.log(shareModal);


	}



	return (
		<button
			id={id}
			onClick={() => ShareHandle()}
			className={btnClass || 'w-fit h-8 flex justify-center flex-row-reverse   bg-yellow border-2 items-center gap-3  px-2 text-xs font-semibold focus:outline-none hover:bg-cyan-300  rounded-full bg-gray-white border-solid border-black'}
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

			Share 
		</button>
	);

}

