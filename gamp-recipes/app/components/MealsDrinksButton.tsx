'use client';
import React from 'react';
import { TRecipesType } from './RecipesFeed';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import { THandleRecipesTypeProps } from './MealsDrinksFilter';

type TMealsDrinksButtonProps = {
	handleRecipesType: (params: THandleRecipesTypeProps) => void,
	newRecipesType: TRecipesType
}

export default function MealsDrinksButton({ handleRecipesType, newRecipesType }: TMealsDrinksButtonProps) {
	const { recipesType, setRecipesType } = useBehaviorContext();
	const capitalizedRecipeType = newRecipesType.charAt(0).toUpperCase() + newRecipesType.slice(1);

	return (
		<button
			onClick={() => handleRecipesType({ currentRecipesType: recipesType, newRecipesType, setRecipesType })}
			className={`flex px-3 py-2 gap-2 ${newRecipesType === recipesType ? 'bg-yellow' : 'bg-gray-200'} rounded-xl font-bold`}
		>
			<img src={`/icons/${newRecipesType.toLowerCase()}.svg`} className='w-6' />
			{capitalizedRecipeType}
		</button>
	);
}
