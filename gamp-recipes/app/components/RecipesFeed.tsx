'use client';
import React, { useEffect, useState } from 'react';
import RecipesCard from './RecipesCard';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';

type TRecipesProps = {
	id: number;
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
	const [filteredRecipes, setFilteredRecipes] = useState<TRecipesProps[]>([]);

	useEffect(() => {
		setFilteredRecipes(recipes.slice(0, recipesQuantity));
	}, [recipes, recipesQuantity]);

	return (
		<>
			<section
				className={ `w-screen transition-transform duration-700 ${ menu ? 'translate-x-full' : 'translate-x-0' }` }
			>
				{filteredRecipes.map((recipe, index) => (
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
				))}
			</section>
		</>
	);
}
