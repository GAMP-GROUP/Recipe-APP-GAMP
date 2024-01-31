import FilterForm from '@/app/components/advanced/FilterForm';
import prisma from '@/prisma/client';
import React from 'react';

export default async function Advanced() {
	const dataArea = await prisma.recipes.findMany({
		select: {
			area: true,
		},
		distinct: ['area']
	});
	const ingredients = await prisma.ingredients.findMany();
	const category = await prisma.category.findMany();
	const type = await prisma.recipe_types.findMany();
	const areas = dataArea.map(e => e.area).filter(e => e !== null) as string[];
	const dataIngredients = [...ingredients.map(({ingredients_name}) => ingredients_name)];
	const categories = [...category.map(({name}) => name)];
	const types = [...type.map(({name}) => name)];
	return (
		<FilterForm 
			dataIngredients={dataIngredients}
			categories={categories}
			types={types}
			areas={areas}
		/>
	);
}