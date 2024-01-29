import RecipesFeed from '@/app/components/RecipesFeed';
import prisma from '@/prisma/client';
import React from 'react';

export default async function AdvRender(props: {
	searchParams: { 
		category: string,
		recipe_type: string,
		recipe_name: string,
		ingredient: string, 
	}
}) {
	const { searchParams: {
		category,
		recipe_type,
		recipe_name,
		ingredient,
	} } = props;

	const categories = await prisma.category.findMany();
	const categoryDefault = category ? category.split(',') : categories.map(e => e.name);
	const typeDefault = recipe_type ? recipe_type.split(',') : ['drink', 'meal'];
	const filteredQuery = await prisma.recipes.findMany({
		include: {
			category_name: true,
			recipe_type: true,
			Ingredients_Recipes: {
				include: {
					ingredient: true
				} 
			},
		},
		where: {
			category_name: { 
				name : { in : categoryDefault } 
			},
			recipe_type: {
				name: { in: typeDefault }
			}
		},
	});
	const recipe_query = recipe_name 
		? filteredQuery.filter(e => e.recipe_name.toLowerCase()
			.includes(recipe_name.toLowerCase())
		) 
		: filteredQuery;
	
	const ingredient_query = ingredient 
		? recipe_query
			.filter(e => e.Ingredients_Recipes
				.some(e => e.ingredient.ingredients_name === ingredient))
		: recipe_query;

	return (
		<section>
			<RecipesFeed
				recipes={ingredient_query}
				recipesQuantity={ingredient_query.length}
				recipesType='all'
			/>
		</section>	
	);
}