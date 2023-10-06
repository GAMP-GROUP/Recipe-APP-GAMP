import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const json = await request.json();
	const { recipe_name, instructions, ingredients, recipe_type, category, amount, image, tags } = json;
	// recipe_name: string, instructions: string (3000), rti = 1 | 2, category: int (pk da category table)
	// ingredients [pk, { name: string }] upsert
	// amount { ig:pk, recipe: pk, ing_amount: string} 


	// Create an array to store the IDs of ingredients
	const ingredientIds = [];

	// Verify each ingredient in the POST request
	for (const { ingredient_name } of ingredients) {
		// Check if the ingredient already exists in the database
		const existingIngredient = await prisma.ingredients.findFirst({
			where: {
				ingredients_name: ingredient_name
			}
		});

		if (existingIngredient) {
			// If the ingredient exists, use the existing ID
			ingredientIds.push(existingIngredient.id);
		} else {
			// If the ingredient doesn't exist, create a new one and get the ID
			const newIngredient = await prisma.ingredients.create({
				data: {
					ingredients_name: ingredient_name
				}
			});
			ingredientIds.push(newIngredient.id);
		}
	}

	const recipe = {
	
	};


	const categoriesCheck = await prisma.category.findFirst({
		where: {
			id: category
		}
	});

	if (!categoriesCheck) {
		// Handle the case where the category doesn't exist
		return new NextResponse('Category not found', { status: 404 });
	}

	const recipeData = {
		recipe_name,
		instructions,
		recipe_type,
		image,
		tags,

		category: category,
		// ingredients: { connect: ingredientIds.map((id) => ({ id })) },
		// amount,
	};

	const createRecipe = await prisma.recipes.create({
		data:
		{
			recipe_type_id: recipe_type,
			recipe_name,
			instructions,
			image,
			tags,
			category,
		},
		
	});

	

	return new NextResponse(JSON.stringify(createRecipe), { status: 201 });
}