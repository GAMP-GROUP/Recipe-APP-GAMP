import prisma from "@/prisma/client"
import RecipesFeed from "@/app/components/RecipesFeed"

type searchProps = {
    params: { query: string }
}

export default async function SearchFeed({ params: { query } }: searchProps) {    
    // Troca os espaços na pesquisa por traço   
    const modifiedQuery = query.replace('%20', ' ')
    const recipesFeed = {
        recipes: [],
        feedType: 'all'
    }
    
    try {
        // Pesquisa o termo refinado
        const mealsRecipes = await prisma.recipes.findMany({
            where: { recipe_type_id: 2, recipe_name: modifiedQuery }
        })
        const drinksRecipes = await prisma.recipes.findMany({
            where: { recipe_type_id: 1, recipe_name: modifiedQuery }
        })
        const ingredient = await prisma.ingredients.findFirst({
            where: { ingredients_name: modifiedQuery }
        })
        const ingredientsRecipes = await prisma.recipes.findMany({
            where: { Ingredients_Recipes: { some: { ingredient_id: ingredient?.id } }}
        })
        
        // Verifica os resultados para cada consulta ao DB e envia resultados para a lista de receitas encontradas
        if (mealsRecipes.length > 0 && drinksRecipes.length > 0) {
            recipesFeed.recipes = [...mealsRecipes, ...drinksRecipes]
            recipesFeed.feedType = 'all'
        } else if (mealsRecipes.length > 0) {
            recipesFeed.recipes = mealsRecipes
            recipesFeed.feedType = 'meal'
        } else if (drinksRecipes.length > 0) {
            recipesFeed.recipes = drinksRecipes
            recipesFeed.feedType = 'drink'
        } else if (ingredientsRecipes.length > 0) {
            recipesFeed.recipes = ingredientsRecipes
            recipesFeed.feedType = 'all'
        }
    } catch(error) {

    }

    return(
        <main>
            { recipesFeed.recipes.length > 0
            ?
            <RecipesFeed
                recipesQuantity={25}
                feedType={ recipesFeed.feedType }
                recipes={recipesFeed.recipes}
            />
            : <h1>Nadaaa aqui</h1> }
        </main>
    )
}