import prisma from '@/prisma/client';
import RecipesFeed from './components/RecipesFeed';
import React from 'react';

export default async function Home() {
	const mealsRecipes = await prisma.recipes.findMany({
		where: { recipe_type_id: 2 }
	});
	const drinksRecipes = await prisma.recipes.findMany({
		where: { recipe_type_id: 1 }
	});
	const allRecipes = [...mealsRecipes, ...drinksRecipes];
  
	function getRandomNumber() {
		return Math.random() - 0.5;
	}
  
	allRecipes.sort(getRandomNumber);

	return (
		<main className='h-full w-full'>
			<section className="flex-row">
				<RecipesFeed
					recipesQuantity={25}
					feedType={ 'all' }
					recipes={ allRecipes }
				/>
			</section>
		</main>
	);
}
