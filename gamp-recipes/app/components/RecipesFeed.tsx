import RecipesCard from "./RecipesCard"

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
    type: 'drinks' | 'meals',
    recipes: TRecipesProps[],
}

export default async function RecipesFeed({ recipesQuantity, type, recipes }: TRecipesFeed) {
    const filteredRecipes = recipes.slice(0, recipesQuantity);   

    return (
        <>
            <main>
                { filteredRecipes.map((recipe, index) => (
                    <div key={ index }>
                        <RecipesCard
                            type={ type }
                            id={ recipe.id }
                            title={ recipe.recipe_name }
                            image={ recipe.image }
                            area={ type === 'meals' ? recipe.area : null }
                            alcoholic={ type === 'drinks' ? recipe.alcoholic : null }
                        />
                    </div>
                )) }
            </main>
        </>
    )
}
