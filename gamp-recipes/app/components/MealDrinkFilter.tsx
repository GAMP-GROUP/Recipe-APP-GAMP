'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { TRecipesType } from './RecipesFeed';
import MealsDrinksButton from './MealsDrinksButton';

export type THandleRecipesTypeProps = {
	currentRecipesType: TRecipesType,
	newRecipesType: TRecipesType,
	setRecipesType: Dispatch<SetStateAction<TRecipesType>>
}

export default function MealDrinKFilter() {
	function handleRecipesType({ currentRecipesType, newRecipesType, setRecipesType }: THandleRecipesTypeProps) {
		if (currentRecipesType === newRecipesType) {
			setRecipesType('all');
		} else {
			setRecipesType(newRecipesType);
		}
	}

	return (
		<section className='flex flex-col gap-2 pb-4'>
			<h2 className='place-self-start'>Discover new recipes</h2>
			<div className='flex gap-2'>
				<MealsDrinksButton
					handleRecipesType={ handleRecipesType }
					newRecipesType='meals'
				/>
				<MealsDrinksButton
					handleRecipesType={ handleRecipesType }
					newRecipesType='drinks'
				/>
			</div>
		</section>
	);
}
