import RecipesCard from './RecipesCard'

type TRecipesProps = {
    id: number;
    recipe_name: string;
    instructions: string;
    image: string;
    tags: string;
    video_source?: string | null;
    area?: string | null;
    alcoholic?: string | null;
    recipe_type_id: number;
    created_at: Date;
    updated_at: Date;
}

type TRecipesFeed = {
    recipesQuantity: number,
    feedType: 'drink' | 'meal' | 'all',
    recipes: TRecipesProps[],
}

export default async function RecipesFeed({ recipesQuantity, recipes }: TRecipesFeed) {
    const filteredRecipes = recipes.slice(0, recipesQuantity);   

    return (
        <>
            <main>
                { filteredRecipes.map((recipe, index) => (
                    <div key={ index }>
                        <RecipesCard
                            type={ recipe.recipe_type_id }
                            id={ recipe.id }
                            title={ recipe.recipe_name }
                            tags={ recipe.tags }
                            image={ recipe.image }
                            area={ recipe.recipe_type_id === 2 ? recipe.area : null }
                            alcoholic={ recipe.recipe_type_id === 1 ? recipe.alcoholic : null }
                        />
                    </div>
                )) }
            </main>
        </>
    )
}
