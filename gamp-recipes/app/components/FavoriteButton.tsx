'use client';

import { ButtonProps } from '@/types';

export default function FavButton({ id, type }: ButtonProps) {
	function favHandle(e: React.MouseEvent<HTMLButtonElement>) {
		const { drink, meal } = JSON.parse(
			localStorage.getItem('favorite') as string
		) || { drink: [], meal: [] };
		const typeAndId = (e.target as Element).id;
		const [type, id] = typeAndId.split(' ');
		const recipeType = type === 'drink';
		const favoriteState = recipeType
			? drink.some((each: string) => each === id)
			: meal.some((each: string) => each === id);
		let temp = {};
		if (favoriteState) {
			recipeType
				? (temp = { drink: drink.filter((each: string) => each !== id), meal })
				: (temp = { drink, meal: meal.filter((each: string) => each !== id) });
		}
		if (!favoriteState) {
			recipeType
				? (temp = { drink: [...drink, id], meal })
				: (temp = { meal: [...meal, id], drink });
		}
		localStorage.setItem('favorite', JSON.stringify(temp));
	}
	return (
		<button
			id={`${type} ${id}`}
			onClick={(e) => favHandle(e)}
			className='rounded-full bg-yellow bg-auto p-5 mb-4 uppercase'
		>
			ADD TO FAVORITES
		</button>
	);
}
