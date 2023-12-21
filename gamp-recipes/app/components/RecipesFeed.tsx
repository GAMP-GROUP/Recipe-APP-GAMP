'use client';
import React, { useEffect, useState } from 'react';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import RecipesCard from './RecipesCard';
import LoadingScreen from './LoadingScreen';

export type TRecipeObject = {
	id: number | null;
	recipe_name: string;
	instructions: string;
	image: string;
	tags: string;
	video_source?: string | null;
	area?: string | null;
	alcoholic?: string | null;
	recipe_type_id: number;
	created_at: Date;
	updated_at: Date;
}

export type TRecipesFeedProps = {
	recipesQuantity: number,
	recipesType: TRecipesType
	recipes: TRecipeObject[],
}

export type TRecipesType = 'all' | 'meals' | 'drinks'

export default function RecipesFeed({ recipesQuantity, recipes }: TRecipesFeedProps) {
	const { recipesType } = useBehaviorContext();
	const [filteredRecipes, setFilteredRecipes] = useState<TRecipeObject[]>([]);

	useEffect(() => {
		let newFilteredRecipes: TRecipeObject[] = [];

		if (recipesType !== 'all') {
			// Filter based on recipe_type_id when recipesType is 'meals' or 'drinks'
			newFilteredRecipes = recipes.filter(recipe => (
				(recipesType === 'meals' && recipe.recipe_type_id === 2) ||
				(recipesType === 'drinks' && recipe.recipe_type_id === 1)
			));
		} else {
			// Include all recipes when recipesType is 'all'
			newFilteredRecipes = recipes;
		}

		// Slice the required quantity of recipes
		setFilteredRecipes(newFilteredRecipes.slice(0, recipesQuantity));
	}, [recipes, recipesQuantity, recipesType]);
	
	return (
		<>
			<section
				id='recipes-feed'
				className={`flex flex-col items-center gap-8
				xl:mt-10 xl:mx-auto xl:grid xl:grid-cols-3 xl:w-8/12 xl:transition-none` }
			>
				{ filteredRecipes.length <= 0 ? <LoadingScreen /> :
					filteredRecipes.map((recipe, index) => (
						<div key={index}>
							<RecipesCard
								type={recipe.recipe_type_id}
								id={recipe.id}
								title={recipe.recipe_name}
								tags={recipe.tags}
								image={recipe.image}
								area={recipe.recipe_type_id === 2 ? recipe.area : null}
								alcoholic={recipe.recipe_type_id === 1 ? recipe.alcoholic : null}
							/>
						</div>
					)) }
			</section>
		</>
	);
}
