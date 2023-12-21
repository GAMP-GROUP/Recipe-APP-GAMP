'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { TRecipesType } from './RecipesFeed';
import MealsDrinksButton from './MealsDrinksButton';

type TMealsDrinksFilterProps = {
    setRecipesType: Dispatch<SetStateAction<TRecipesType>>
}

export default function MealDrinKFilter({ setRecipesType }: TMealsDrinksFilterProps) {
	return (
		<section className='flex flex-col gap-2 pb-4'>
			<h2 className='place-self-start'>Discover new recipes</h2>
			<div className='flex gap-2'>
				<MealsDrinksButton
					setRecipesType={ setRecipesType }
					recipeType='meals'
				/>
				<MealsDrinksButton
					setRecipesType={ setRecipesType }
					recipeType='drinks'
				/>
			</div>
		</section>
	);
}
