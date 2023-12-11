'use client';
import React, { useEffect, useState } from 'react';
import RecipesCard from './RecipesCard';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import LoadingScreen from './LoadingScreen';
import useWindowDimensions from '../hooks/useWindowDimensions';

type TRecipesProps = {
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

type TRecipesFeed = {
	recipesQuantity: number,
	feedType: 'drink' | 'meal' | 'all',
	recipes: TRecipesProps[],
}

export default function RecipesFeed({ recipesQuantity, recipes }: TRecipesFeed) {
	const { menu } = useBehaviorContext();
	const { width } = useWindowDimensions();
	const [filteredRecipes, setFilteredRecipes] = useState<TRecipesProps[]>([]);

	useEffect(() => {
		setFilteredRecipes(recipes.slice(0, recipesQuantity));
	}, [recipes, recipesQuantity]);

	return (
		<>
			<section
				id='recipes-feed'
				className={ `transition-opacity duration-500 ${ width >= 1536 ? '' : menu ? 'opacity-0' : 'opacity-100' } 
				2xl:absolute 2xl:mx-auto 2xl:top-20 2xl:grid 2xl:grid-cols-3 2xl:w-8/12 2xl:transition-none` }
			>
				{	filteredRecipes.length <= 0 ? <LoadingScreen /> : 
					filteredRecipes.map((recipe, index) => (
						<div key={ index }>
							<RecipesCard
								type={ recipe.recipe_type_id }
								id={ recipe.id }
								title={ recipe.recipe_name }
								tags={ recipe.tags }
								image={ recipe.image }
								area={ recipe.recipe_type_id === 2 ? recipe.area : null }
								alcoholic={ recipe.recipe_type_id === 1 ? recipe.alcoholic : null }
							/>
						</div>
					)) }
			</section>
		</>
	);
}
