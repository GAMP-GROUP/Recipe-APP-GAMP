'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { TRecipesType } from './RecipesFeed';
import MealsDrinksButton from './MealsDrinksButton';

export type THandleRecipesTypeProps = {
	currentRecipesType: TRecipesType,
	newRecipesType: TRecipesType,
	setRecipesType: Dispatch<SetStateAction<TRecipesType>>
}

export default function MealsDrinksFilter() {
	function handleRecipesType({ currentRecipesType, newRecipesType, setRecipesType }: THandleRecipesTypeProps) {
		if (currentRecipesType === newRecipesType) {
			setRecipesType('all');
		} else {
			setRecipesType(newRecipesType);
		}
	}

	return (
		<section className='flex flex-col gap-2 pb-4 xl:mx-auto'>
			<h2 className='place-self-start'>Discover new recipes</h2>
			<div className='flex gap-2 xl:justify-around'>
				<MealsDrinksButton
					handleRecipesType={handleRecipesType}
					newRecipesType='meals'
				/>
				<MealsDrinksButton
					handleRecipesType={handleRecipesType}
					newRecipesType='drinks'
				/>
			</div>
		</section>
	);
}
