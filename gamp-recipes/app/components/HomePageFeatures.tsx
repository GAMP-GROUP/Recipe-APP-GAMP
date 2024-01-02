'use client';
import React from 'react';
import FullBanner from './FullBanner';
import MiniBanner from './MiniBanner';
import WelcomeBar from './WelcomeBar';
import WeeklyRecipe from './WeeklyRecipe';
import RecipesFeed, { TRecipeObject } from './RecipesFeed';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import SearchBar from './SearchBar';
import MealsDrinksFilter from './MealsDrinksFilter';

type THomePageFeaturesProps = {
	recipes: TRecipeObject[],
	recipesQuantity: number
}

export default function HomePageFeatures({ recipesQuantity, recipes }: THomePageFeaturesProps) {
	const { menu, recipesType } = useBehaviorContext();

	return (
		<section
			className={`flex flex-col gap-4 transition-opacity duration-500 ${ menu ? 'opacity-0' : 'opacity-100' }`}
		>
			<section>
				<FullBanner />
				<MiniBanner />
			</section>
			<WelcomeBar />
			<SearchBar />
			<WeeklyRecipe />
			<MealsDrinksFilter />
			<RecipesFeed
				recipesType={recipesType}
				recipesQuantity={recipesQuantity}
				recipes={recipes}
			/>
		</section>
	);
}
