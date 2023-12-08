import React from 'react';
import { detailedParams } from '@/types';

import InProgressCard from '@/app/components/InProgressCard';

import prisma from '@/prisma/client';


export default async function InProgress({
	params: { detailed },
}: detailedParams) {


	const recipe = await prisma.recipes.findUnique({
		where: {
			id: Number(detailed),
		},
		include: {
			Author_Recipe: {
				select: {
					author: {
						select: {
							username: true,

						}
					}
				},
			},

			category_name: true,
			recipe_type: true,
			Ingredients_Recipes: {
				select: {
					ing_amount: true,
					ingredient: {
						select: {
							ingredients_name: true,
						},
					},
				},

			},
		},
	});

	console.log('recipe line 39', recipe?.Author_Recipe[0]?.author?.username);




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
			ingredients: recipe.Ingredients_Recipes,

			category_name: recipe.category_name.name,
			recipe_type_name: recipe.recipe_type.name,
			author: recipe?.Author_Recipe[0]?.author?.username
		}} detailed={detailed} />
	);
}
