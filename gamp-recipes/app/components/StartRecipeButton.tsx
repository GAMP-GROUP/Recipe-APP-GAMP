'use client';

import React from 'react';
import { ButtonProps } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function StartRecipeButton({ id }: ButtonProps) {
	const started = JSON.parse(localStorage.getItem('recipes') as string) || [];
	const isStarted = started.some((recipe: string) => recipe === id);
	const router = useRouter();
	const { status } = useSession();

	function startHandle(e: React.MouseEvent<HTMLButtonElement>) {
		if (status === 'unauthenticated') router.replace('/auth/signin');
		const id = (e.target as Element).id;
		isStarted ? null : localStorage.setItem('recipes', JSON.stringify([...started, id]));
		router.push(`${id}/inProgress`);
	}


	return (
		<>
			<button
				onClick={(e) => { startHandle(e);}}
				className='rounded-full bg-yellow bg-auto p-5 my-2 uppercase'
				id={id}
			>{isStarted ? 'Continue Recipe' : 'Start Recipe' }
			</button>
		</>
	);
}
