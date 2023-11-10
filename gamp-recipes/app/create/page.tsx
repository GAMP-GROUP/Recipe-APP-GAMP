import React from 'react';
import prisma from '@/prisma/client';
import CreateRecipeForm from '../components/CreateRecipeForm';

export default async function Create() {
	const ingredients = await prisma.ingredients.findMany();
	const categories = await prisma.category.findMany();

	return (
		<section className='flex-row justify-center items-center h-[600px]'>
			<h1 className='text-center font-extrabold text-xl mt-4'>New Recipe</h1>
			<CreateRecipeForm
				ingredientsList={ ingredients }
				categoryList={ categories }
			/>
		</section>
	);
}
