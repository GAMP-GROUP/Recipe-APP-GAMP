import React from 'react';
import prisma from '@/prisma/client';
import Footer from './components/Footer';
import HomePageFeatures from './components/HomePageFeatures';

export default async function Home() {
	function getRandomNumber() {
		return Math.random() - 0.5;
	}

	const data = await prisma.recipes.findMany({
		include: { category_name: true },
	});

	const allRecipes = data.map((e) => { 
		return { 
			...e,
			category: e.category_name.name
		}; 
	});

	allRecipes.sort(getRandomNumber);

	return (
		<section
			className='lg:flex-col lg:mt-16'
		>
			<HomePageFeatures
				recipes={ allRecipes }
				recipesQuantity={ 30 }
			/>
			<Footer />
		</section>
	);
}
