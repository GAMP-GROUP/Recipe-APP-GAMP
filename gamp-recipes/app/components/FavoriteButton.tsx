'use client';

import React from 'react';
import { ButtonProps } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function FavButton({id}: ButtonProps) {
	const session = useSession();
	const router = useRouter();

	async function favHandle(e: React.MouseEvent<HTMLButtonElement>) {
		if (session.status === 'unauthenticated') router.replace('/auth/signin');

		const id = (e.target as Element).id;

		//Explorar possíveis soluções para incluir a PK do usuário autenticado pela session
		const req = await fetch(`http://localhost:3000/${id}/favorite`, {
			method: 'POST',
			body: JSON.stringify({id}),
		});

		const data = await req.json();
		const favState = (data.message.fav ? 'Added to Favorites' : 'Removed from Favorites') || 'cold start';
		window.alert(favState);
	}

	return (
		<button
			id={`${id}`}
			onClick={(e) => favHandle(e)}
			className='rounded-full bg-yellow bg-auto p-5 mb-4 uppercase'
		>
      ADD TO FAVORITES
		</button>
	);
  
}

