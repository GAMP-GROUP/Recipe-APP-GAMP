'use client';

import { ButtonProps } from '@/types';

export default function StartRecipeButton({ id, type }: ButtonProps) {
	const { drink, meal } = JSON.parse(
		localStorage.getItem('recipes') as string
	) || { drink: [null], meal: [null] };
	const started =
		type === 'drink'
			? drink.some((each: string) => each === id)
			: meal.some((each: string) => each === id);

	return (
		<>
			<button
				className='rounded-full bg-yellow bg-auto p-5 my-2 uppercase'
				id={id}
			>
				{started ? 'Continue Recipe' : 'Start Recipe'}
			</button>
		</>
	);
}
