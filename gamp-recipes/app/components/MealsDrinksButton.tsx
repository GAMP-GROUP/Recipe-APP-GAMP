import React, { Dispatch, SetStateAction } from 'react';
import { TRecipesType } from './RecipesFeed';

type TMealsDrinksButtonProps = {
    setRecipesType: Dispatch<SetStateAction<TRecipesType>>,
    recipeType: TRecipesType
}

export default function MealsDrinksButton({ setRecipesType, recipeType }: TMealsDrinksButtonProps) {
	const capitalizedRecipeType = recipeType.charAt(0).toUpperCase() + recipeType.slice(1);

	return (
		<button
			onClick={() => setRecipesType(recipeType)}
			className='flex px-3 py-2 gap-2 bg-gray-200 rounded-xl font-bold'
		>
			<img src={`/icons/${ recipeType.toLowerCase() }.svg`} className='w-6' />
			{ capitalizedRecipeType }
		</button>
	);
}
