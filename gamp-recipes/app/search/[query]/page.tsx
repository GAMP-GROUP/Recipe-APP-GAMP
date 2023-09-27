import prisma from "@/prisma/client"
import RecipesFeed from "@/app/components/RecipesFeed"

type searchProps = {
    params: { query: string }
}

type TRecipesFeed = {
    recipes: {
        id: number;
        recipe_name: string;
        instructions: string;
        image: string;
        tags: string;
        video_source: string | null;
        area: string | null; alcoholic:
        string | null;
        recipe_type_id: number;
        created_at: Date;
        updated_at: Date;
    }[],
    feedType: 'all' | 'meal' | 'drink'
}

export default async function SearchFeed({ params: { query } }: searchProps) {    
    // Troca os espaços na pesquisa por traço   
    const modifiedQuery = query.replace('%20', ' ')
    const recipesFeed: TRecipesFeed = {
        recipes: [],
        feedType: 'all'
    }
    
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

    // Caso algum ingrediente seja encontrado, é acionada a pesquisa por receitas com aquele ingrediente
    if (ingredient !== null) {
        const ingredientsRecipes = await prisma.recipes.findMany({
            where: { Ingredients_Recipes: { some: { ingredient_id: ingredient?.id } }}
        })
        if (ingredientsRecipes.length > 0) {
            recipesFeed.recipes = ingredientsRecipes
            recipesFeed.feedType = 'all'
        }
    }        
    
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
            : <h1>Nenhum resultado encontrado</h1> }
        </main>
    )
}