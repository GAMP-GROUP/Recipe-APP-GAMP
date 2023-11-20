import React from 'react';
import { detailedParams } from '@/types';


import InProgressCard from '@/app/components/InProgressCard';
import { getRecipeById } from '@/app/api/recipe/recipe.service';


export default async function InProgress({
	params: { detailed },
}: detailedParams) {

	const recipe = await getRecipeById(parseInt(detailed));
	if (!recipe) return null;

	return (
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
			ingredients: recipe.Ingredients_Recipes
		}} detailed={detailed} />
	);
}
