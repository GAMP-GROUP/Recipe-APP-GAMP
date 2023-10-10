import React from 'react';
import prisma from '@/prisma/client';
import { Ingredients } from '@prisma/client';
import CreateRecipeForm from '../components/CreateRecipeForm';

export default async function Create() {
	async function fetchIngredients() {
		const response = await prisma.ingredients.findMany();
		return response;
	}

	const ingredientsList: Ingredients[] = await fetchIngredients();

	return (
		<section className='flex-row justify-center items-center h-[600px]'>
			<h1 className='text-center font-extrabold text-xl mt-4'>New Recipe</h1>
			<CreateRecipeForm
				ingredientsList={ ingredientsList }
			/>
		</section>
	);
}
