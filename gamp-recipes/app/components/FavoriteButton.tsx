'use client';
import React from 'react';
import { ButtonProps } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function FavButton({ id, ImgClass, btnClass}: ButtonProps) {
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
			body: JSON.stringify({ id }),
		});

		const { message: { fav } } = await res.json();
		const favState = (fav ? 'Added to Favorites' : 'Removed from Favorites') || 'cold start';
		window.alert(favState);
	}
	// 'rounded-full bg-yellow p-2 w-[2.35em] h-[2.35em] z-3 absolute top-8 right-8'
	return (
		<button
			id={id}
			onClick={(e) => favHandle(e)}
			className={ btnClass || 'rounded-full bg-yellow p-2 w-[2.35em] h-[2.35em] z-3 absolute top-8 right-8' }
		>
			<picture
				id={id}
				className='m-auto'>
				<img
					id={id}
					alt='Favorite button'
					src='/icons/favorites-notactive.png'
					className={ ImgClass }
				/>
			</picture>
		</button>
	);

}

