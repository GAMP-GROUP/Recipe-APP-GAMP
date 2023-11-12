import React from 'react';
import prisma from '@/prisma/client';
import CreateRecipeForm from '../components/CreateRecipeForm';

export default async function Create() {
	const fetchAllIngredients = await prisma.ingredients.findMany();
	const fetchRecipeCategories = await prisma.category.findMany();

	return (
		<section className='flex-row justify-center items-center h-auto my-6'>
			<h1 className='text-center font-extrabold text-xl'>New Recipe</h1>
			<CreateRecipeForm
				allIngredientsList={ fetchAllIngredients }
				categoryList={ fetchRecipeCategories }
			/>
		</section>
	);
}
