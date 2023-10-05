import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const json = await request.json();
	const { recipe_name, instructions, ingredients, ing_amount, type, category, image, tags } = json;

	// Crie um array para armazenar os IDs dos ingredientes
	const ingredientIds = [];
	const categoriesIds = [];

	// Verifique cada ingrediente no pedido POST
	for (const { ingredient_name } of ingredients) {
		// Verifique se o ingrediente já existe no banco de dados
		const existingIngredient = await prisma.ingredients.findFirst({
			where: {
				ingredients_name: ingredient_name // Use ingredients_name em vez de ingredient_name
			}
		});

		if (existingIngredient) {
			// Se o ingrediente existe, use o ID existente
			ingredientIds.push(existingIngredient.id);
		} else {
			// Se o ingrediente não existe, crie um novo e obtenha o ID
			const newIngredient = await prisma.ingredients.create({
				data: {
					ingredients_name: ingredient_name // Use ingredients_name em vez de ingredient_name
				}
			});
			ingredientIds.push(newIngredient.id);
		}
	}

	const existingCategory = await prisma.category.findFirst({
		where: {
			Recipes: {
				some: {
					category_name: category
				}
			}
			
		}
	});

	if (existingCategory) {
		// If the category exists, connect it to the recipe
		categoriesIds.push(existingCategory.id);
	}

	// Crie a nova receita associando os ingredientes pelos IDs
	const recipe = await prisma.recipes.create({
		data: {
			recipe_name,
			instructions,
			recipe_type: { connect: { id: type } },
			category: { connect: { id: categoriesIds[0] } },
			image,
			tags,
			Ingredients_Recipes: {
				create: ingredientIds.map((ingredientId) => ({
					ingredients_id: ingredientId,
					ing_amount,
					ingredient: { connect: { id: ingredientId } },

				})),
			},
		},
	});

	return new NextResponse(JSON.stringify(recipe), { status: 201 });

}
