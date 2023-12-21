import React from 'react';
import prisma from '@/prisma/client';
import RecipesFeed from './components/RecipesFeed';
import FullBanner from './components/FullBanner';
import MiniBanner from './components/MiniBanner';
import Footer from './components/Footer';
import WelcomeBar from './components/WelcomeBar';

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
			className='lg:flex-col lg:mt-16'
		>
			<FullBanner />
			<MiniBanner />
			<WelcomeBar />
			<RecipesFeed
				recipesQuantity={30}
				feedType={'all'}
				recipes={allRecipes}
			/>
			<Footer />
		</section>
	);
}
