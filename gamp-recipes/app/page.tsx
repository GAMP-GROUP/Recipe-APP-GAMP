import React from 'react';
import prisma from '@/prisma/client';
import RecipesFeed from './components/RecipesFeed';
import FullBanner from './components/FullBanner';
// import MiniBanner from './components/MiniBanner';

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
		<section
			className='2x:flex 2xl:flex-row'
		>
			<FullBanner />
			{/* <MiniBanner /> */}
			<RecipesFeed
				recipesQuantity={25}
				feedType={'all'}
				recipes={allRecipes}
			/>
		</section>
	);
}
