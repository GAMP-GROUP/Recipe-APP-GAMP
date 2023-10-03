import prisma from './client';
import {
	usersData,
	recipeTypesData,
	author,
} from './data';
import { scrapv2 } from './scrap/v2';


const load = async () => {
	try {
		await prisma.user.createMany({
			data: usersData,
		});
		console.log('Added users data');

		await prisma.recipe_types.createMany({
			data: recipeTypesData,
		});
		console.log('Added recipe types data');  

		const categories = Array.from(new Set<string>(scrapv2.map((recipe) => recipe.category.toLowerCase())));
		const data = categories.map((each) => ({ name: each}));
		await prisma.category.createMany({
			data,
		});

		const recipes = await Promise.all(scrapv2.map(async({recipeData, ingredients, amount, category}) => {
			const catId = await prisma.category.findFirst({
				where: {
					name: category
				}
			});

			const newData = {
				...recipeData,
				category: catId?.id as number
			};

			const recipe = await prisma.recipes.create({
				data: newData
			});
			return { id: recipe.id, ingredients, amount };
		})
		);

		const ings: string[] = [];
		recipes.forEach(({ ingredients }) =>  ingredients.forEach((ingredient) => ings.push(ingredient.toLowerCase())));

		const uniqueIngs = Array.from(new Set(ings)).map((ing) => ({ ingredients_name: ing }));
    
		await prisma.ingredients.createMany({
			data: uniqueIngs
		});

		const ingredientsRecipes = await Promise.all(recipes
			.map(async ({ingredients, amount, id}) => await Promise.all(ingredients
				.map(async (one, index) => {
					const inDB = await prisma.ingredients.findFirst({
						where: {
							ingredients_name: one.toLowerCase(),
						}
					});
					return { ingredient_id: inDB?.id as number, recipe_id: id, ing_amount: amount[index]};
				}))
			));

		await Promise.all(ingredientsRecipes.map(async(relation) => {
			await prisma.ingredients_Recipes.createMany({
				data: relation,
			});
		}));

		await prisma.author_Recipe.createMany({
			data: author,
		});
		console.log('Added author data');
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
};

load();
