'use client';

import React from 'react';
import { ButtonProps } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function FavButton({id}: ButtonProps) {
	const session = useSession();
	const router = useRouter();

	async function favHandle(e: React.MouseEvent<HTMLButtonElement>) {
		if (session.status === 'unauthenticated') {
			window.alert('You need to sign in or register in GAMP in order to favorite recipes');
			router.replace('/auth/signin');
			return;
		}
		const id = (e.target as Element).id;

		const res = await fetch(`http://localhost:3000/${id}/favorite`, {
			method: 'POST',
			body: JSON.stringify({id}),
		});

		const { message: { fav }} = await res.json();
		const favState = (fav ? 'Added to Favorites' : 'Removed from Favorites') || 'cold start';
		window.alert(favState);
	}

	return (
		<button
			id={id}
			onClick={(e) => favHandle(e)}
			className='bg-yellow rounded-full w-14 h-14 z-3'
		>
			<picture 
				id={id}
				className='m-auto'>
				<img
					id={id}
					alt='Favorite button'
					src='/icons/favorites-notactive.png'
					className='w-7 mx-auto'
				/>
			</picture>
		</button>
	);
  
}

