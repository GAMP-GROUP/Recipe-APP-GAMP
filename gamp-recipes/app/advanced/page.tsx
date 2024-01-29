import FilterForm from '@/app/components/advanced/FilterForm';
import prisma from '@/prisma/client';
import React from 'react';

export default async function Advanced() {
	const ingredients = await prisma.ingredients.findMany();
	const category = await prisma.category.findMany();
	const type = await prisma.recipe_types.findMany();
	const dataIngredients = [...ingredients.map(({ingredients_name}) => ingredients_name)];
	const categories = [...category.map(({name}) => name)];
	const types = [...type.map(({name}) => name)];
	return (
		<FilterForm 
			dataIngredients={dataIngredients}
			categories={categories}
			types={types}
		/>
	);
}