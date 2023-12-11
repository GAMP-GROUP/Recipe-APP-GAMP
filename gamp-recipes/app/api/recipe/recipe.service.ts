import { HttpStatusCode } from '@/app/lib/HTTPHandler';
import { userAuth } from '@/app/middlewares/authToken';
import prisma from '@/prisma/client';
import { NewRecipeResponse, UpdateRecipeRequest, Request } from '@/types';
import { use } from 'chai';



export async function createRecipe(request: Request): Promise<NewRecipeResponse> {
	const { recipe_type_id, recipe_name, instructions, image, tags, category, ingredients, amount } = await request.json();
	const { message, user } = await userAuth(request);

	if (message !== 'success' || user == undefined) return { message, TYPE: HttpStatusCode.Unauthorized };

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

		return { message: 'Category not found', TYPE: HttpStatusCode.NotFound };
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
					ing_amount: amount[ingredientIds.indexOf(ingredientId)],
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
		amount: amount,
	};


	const addAuthor = await prisma.author_Recipe.create({
		data: {
			author_id: user.id,
			recipe_id: createdRecipe.id,
		},
	});
	if (addAuthor === null) {
		return { message: 'Receita não encontrada', TYPE: HttpStatusCode.NotFound };
	}

	return { message: response, TYPE: HttpStatusCode.Created };
}





export async function updateRecipe(request: UpdateRecipeRequest): Promise<NewRecipeResponse> {
	const { id, recipe_name, instructions, image, tags, category, ingredients, amount, recipe_type_id } = request;



	const ingredientIds: number[] = [];

	if (ingredients) {
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
				ingredientIds.push(newIngredient.id);
			}

		}
	}

	const ingredientRecipe = await prisma.ingredients_Recipes.findFirst({
		where: {
			recipe_id: id
		}
	});
	if (!ingredientRecipe) {
		return { message: 'Receita não encontrada', TYPE: HttpStatusCode.NotFound };
	}



	const updateRecipe = await prisma.recipes.update({
		where: { id },
		data: {
			recipe_name,
			instructions,
			image,
			tags,
			category,
			recipe_type_id,
			Ingredients_Recipes: {
				update: ingredientIds.map((ingredientId) => ({
					where: { id: ingredientRecipe.id },
					data: {
						ingredient: { connect: { id: ingredientId } },
						ing_amount: amount && amount[ingredientIds.indexOf(ingredientId)]
					},
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


	if (updateRecipe === null) {
		return { message: 'Receita não encontrada', TYPE: HttpStatusCode.NotFound };
	}

	const response = {
		id: updateRecipe.id,
		recipe_name: updateRecipe.recipe_name,
		instructions: updateRecipe.instructions,
		image: updateRecipe.image,
		tags: updateRecipe.tags,
		recipe_type_id: updateRecipe.recipe_type_id,
		category: updateRecipe.category,
		created_at: updateRecipe.created_at,
		updated_at: updateRecipe.updated_at,
		ingredients: updateRecipe.Ingredients_Recipes.map((ingredient) => ({
			ingredient_name: ingredient.ingredient.ingredients_name,
			ing_amount: ingredient.ing_amount,
		})),
		amount: amount as unknown as string[],
	};

	return { message: response, TYPE: HttpStatusCode.OK };
}


export async function deleteRecipe(request: number) {
	try {

		await prisma.ingredients_Recipes.deleteMany({
			where: {
				recipe_id: request,
			},
		});

		await prisma.recipes.delete({
			where: {
				id: request,
			},
		});
	} catch (error) {
		console.error('Error deleting recipe:', error);
	}
}


export async function getRecipes() {
	try {
		const recipes = await prisma.recipes.findMany({
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

		return recipes;
	} catch (error) {
		console.error('Error getting recipes:', error);
	}
}


export async function getRecipeById(request: number) {


	try {
		const recipe = await prisma.recipes.findUnique({
			where: {
				id: request,
			},
			include: {
				Author_Recipe: true,
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
		console.log('request', request);

		console.log('recipe------- 296', recipe);


		return recipe;
	} catch (error) {
		console.error('Error getting recipe:', error);
	}
}


export async function finishRecipe (request: Request) {
	try {
		const { message, user } = await userAuth(request);
		console.log('user', message, user);
		
		

		if (message !== 'success' || user == undefined) return { message, TYPE: HttpStatusCode.Unauthorized };

		const recipe = await prisma.finished_Recipes.create({
			data: {
				recipe_id: request,
				user_id: user.id,
				
			},
		});

		console.log('recipe', recipe);
		console.log(user.id);
		
		
		return recipe;
	} catch (error) {
		console.error('Error finishing recipe:', error);
	}
}
