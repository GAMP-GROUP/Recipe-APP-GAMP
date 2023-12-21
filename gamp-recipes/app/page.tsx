import React from 'react';
import prisma from '@/prisma/client';
import Footer from './components/Footer';
import HomePageFeatures from './components/HomePageFeatures';

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
			<HomePageFeatures
				feedType='all'
				recipes={ allRecipes }
				recipesQuantity={ 30 }
				key={ 0 }
			/>
			<Footer />
		</section>
	);
}
