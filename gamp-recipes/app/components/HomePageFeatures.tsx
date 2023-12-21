'use client';
import React from 'react';
import FullBanner from './FullBanner';
import MiniBanner from './MiniBanner';
import WelcomeBar from './WelcomeBar';
import WeeklyRecipe from './WeeklyRecipe';
import RecipesFeed, { TRecipesFeedProps } from './RecipesFeed';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';

export default function HomePageFeatures({ recipesQuantity, recipes }: TRecipesFeedProps) {
	const { menu } = useBehaviorContext();

	return (
		<section
			className={ `transition-opacity duration-500 ${ menu ? 'opacity-0' : 'opacity-100' }` }
		>
			<FullBanner />
			<MiniBanner />
			<WelcomeBar />
			<WeeklyRecipe />
			<RecipesFeed
				recipesQuantity={ recipesQuantity }
				feedType={ 'all' }
				recipes={ recipes }
			/>
		</section>
	);
}