import { PrismaClient } from "@prisma/client";
import { 
  usersData,
  ingredientsData,
  recipeTypesData,
  recipeData,
  ingredientAmount,
  favorites,
  author
} from "./data";

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.createMany({
      data: usersData,
    });
    console.log("Added users data");

    await prisma.ingredients.createMany({
      data: ingredientsData,
    });
    console.log("Added ingredients data");

    await prisma.recipe_types.createMany({
      data: recipeTypesData,
    });
    console.log("Added recipe types data");

    await prisma.recipes.createMany({
      data: recipeData,
    })
    console.log("Added recipes data");

    await prisma.ingredients_Recipes.createMany({
      data: ingredientAmount,
    })
    console.log("Added ingredients amount");

    await prisma.favorite_Recipes.createMany({
      data: favorites,
    })
    console.log("Added favorites data");   

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
