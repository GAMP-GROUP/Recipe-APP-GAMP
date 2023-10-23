import { HttpStatusCode } from '@/app/lib/HTTPHandler';
import prisma from '@/prisma/client';
import { NewRecipeRequest, NewRecipeResponse } from '@/types';


export async function createRecipe(request: NewRecipeRequest): Promise<NewRecipeResponse> {
	const { recipe_type_id, recipe_name, instructions, image, tags, category, ingredients, amount } = request;

	const ingredientIds: number[] = [];

        
	for (const { ingredient_name } of ingredients) {

		const existingIngredient = await prisma.ingredients.findFirst({
			where: {
				ingredients_name: ingredient_name
			}
		});

		if (existingIngredient) {
			ingredientIds.push(existingIngredient.id);
			
		} else {

			const newIngredient = await prisma.ingredients.create({
				data: {
					ingredients_name: ingredient_name
				}
			});
			console.log('LINHA 33', newIngredient);
			ingredientIds.push(newIngredient.id);
		}
		
	}


	const categoriesCheck = await prisma.category.findFirst({
		where: {
			id: category
		}
	});

	if (!categoriesCheck) {
	
		return {message: 'Category not found',  TYPE: HttpStatusCode.NotFound};
	}

	const createdRecipe = await prisma.recipes.create({
		data: {
			recipe_name,
			instructions,
			image,
			tags,
			category,
			recipe_type_id,
			Ingredients_Recipes: {
				create: ingredientIds.map((ingredientId) => ({
					ingredient: { connect: { id: ingredientId } },
					ing_amount: amount[0],
				})),
			},
		},
		include: {
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

	const response = {
		id: createdRecipe.id,
		recipe_name: createdRecipe.recipe_name,
		instructions: createdRecipe.instructions,
		image: createdRecipe.image,
		tags: createdRecipe.tags,
		category: createdRecipe.category,
		recipe_type_id: createdRecipe.recipe_type_id,
		created_at: createdRecipe.created_at,
		updated_at: createdRecipe.updated_at,
		ingredients: createdRecipe.Ingredients_Recipes.map((ingredient) => ({
			ingredient_name: ingredient.ingredient.ingredients_name,
			ing_amount: ingredient.ing_amount,
		})),
	};
	
    

	return { message: response,  TYPE: HttpStatusCode.Created };
}
