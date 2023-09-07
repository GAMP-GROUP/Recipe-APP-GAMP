import { PrismaClient } from "@prisma/client";
import { 
  usersData,
  ingredientsData,
  recipeTypesData,
  recipeData,
  ingredientAmount,
  favorites,
  author,
} from "./data";
import { scrap } from "./scrapRecipe"

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.createMany({
      data: usersData,
    });
    console.log("Added users data");

    await prisma.recipe_types.createMany({
      data: recipeTypesData,
    });
    console.log("Added recipe types data");  

    const recipes = await Promise.all(scrap.map(async({recipeData, ingredients, amount}) => {
        const recipe = await prisma.recipes.create({
          data: recipeData,
        })
        return { id: recipe.id, ingredients, amount }
      })
    )

    const ings: string[] = []
    recipes.forEach(({ingredients}) =>  ingredients.forEach((ingredient) => ings.push(ingredient.toLowerCase())));
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
          })
          return { ingredient_id: inDB?.id as number, recipe_id: id, ing_amount: amount[index]}
        }))
      ));

    await Promise.all(ingredientsRecipes.map(async(relation) => {
      await prisma.ingredients_Recipes.createMany({
        data: relation,
      })
    }));

    await prisma.author_Recipe.createMany({
      data: author,
    })
    console.log("Added author data");

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
