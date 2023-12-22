import { detailedParams } from '@/types';
import React from 'react';
import InProgressCard from '../components/InProgressCard';
import { getRecipeById } from '../lib/recipeApi';

export default async function Details({ params: { detailed } }: detailedParams) {
	const id = Number(detailed);
	const recipe = await getRecipeById(id.toString());

	if (!recipe) return null;

	return (
		<div className='mb-3'>
			<InProgressCard recipe={{
				id: recipe.id, 
				recipe_name: recipe.recipe_name,
				instructions: recipe.instructions,
				image: recipe.image,
				tags: recipe.tags,
				category: recipe.category,
				video_source: recipe.video_source,
				area: recipe.area,
				alcoholic: recipe.alcoholic,
				recipe_type_id: recipe.recipe_type_id,
				created_at: recipe.created_at,
				updated_at: recipe.updated_at,
				ingredients: recipe.Ingredients_Recipes,

				category_name: recipe.category_name.name,
				recipe_type_name: recipe.recipe_type.name,
				author: recipe?.Author_Recipe[0]?.author?.username
			}} detailed={detailed}  />
		</div>
	);
}