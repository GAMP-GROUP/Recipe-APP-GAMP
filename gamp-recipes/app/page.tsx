import React from 'react';
import prisma from '@/prisma/client';
import RecipesFeed from './components/RecipesFeed';

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
		<RecipesFeed
			recipesQuantity={25}
			feedType={'all'}
			recipes={allRecipes}
		/>
	);
}
