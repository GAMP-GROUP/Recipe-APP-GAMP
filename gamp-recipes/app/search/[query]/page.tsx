import prisma from "@/prisma/client"
import RecipesFeed from "@/app/components/RecipesFeed"
import Image from "next/image"

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
    feedType: 'all' | 'meal' | 'drink',
    totalRecipes: number,
}

export default async function SearchFeed({ params: { query } }: searchProps) {    
    // Troca os espaços na pesquisa por traço   
    const modifiedQuery = query.replace('%20', ' ')
    const recipesFeed: TRecipesFeed = {
        recipes: [],
        feedType: 'all',
        totalRecipes: 0
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
            recipesFeed.totalRecipes = recipesFeed.recipes.length
        }
    }        
    
    // Verifica os resultados para cada consulta ao DB e envia resultados para a lista de receitas encontradas
    if (mealsRecipes.length > 0 && drinksRecipes.length > 0) {
        recipesFeed.recipes = [...mealsRecipes, ...drinksRecipes]
        recipesFeed.feedType = 'all'
        recipesFeed.totalRecipes = recipesFeed.recipes.length
    } else if (mealsRecipes.length > 0) {
        recipesFeed.recipes = mealsRecipes
        recipesFeed.feedType = 'meal'
        recipesFeed.totalRecipes = recipesFeed.recipes.length
    } else if (drinksRecipes.length > 0) {
        recipesFeed.recipes = drinksRecipes
        recipesFeed.feedType = 'drink'
        recipesFeed.totalRecipes = recipesFeed.recipes.length
    }
    const { totalRecipes } = recipesFeed;

    return(
        <main>
            { totalRecipes > 0
            ?
            <>
                <h1 className="text-center mx-auto mt-8 font-extrabold text-lg">
                    { `Showing ${totalRecipes} ${totalRecipes > 1 ? 'results' : 'result' }` }
                </h1>
                <RecipesFeed
                    recipesQuantity={25}
                    feedType={ recipesFeed.feedType }
                    recipes={recipesFeed.recipes}
                />
            </>
            : 
            <section className="h-[600px] w-screen flex flex-col justify-center items-center">
                <h1 className="text-center font-extrabold text-lg">
                    No results have been found
                </h1>
                <Image
                    alt='Sad emoji'
                    src='/icons/sad.png'
                    width={35}
                    height={35}
                    className="mt-2"
                />
            </section>
             }
        </main>
    )
}