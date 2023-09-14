import RecipesCard from "./RecipesCard"

type TDrinkOrMeal = 'drink' | 'meal'

type MealsRecipesProps = {
    id: string,
    recipeName: string,
    thumb: string,
    tags: string[],
    area: string,
    createdAt: Date,
    updatedAt: Date,
    author: string,
    ingredients: string[],
    favorites: string[],
}

type DrinksRecipesProps = {
    id: string,
    recipeName: string,
    thumb: string,
    tags: string[],
    alcoholic: boolean,
    createdAt: Date,
    updatedAt: Date,
    author: string,
    ingredients: string[],
    favorites: string[],
}

type RecipesFeedProps = {
    recipesQuantity: number,
    type: TDrinkOrMeal,
    recipes: MealsRecipesProps[] | DrinksRecipesProps[]
}

export default function RecipesFeed({ recipesQuantity, type, recipes }: RecipesFeedProps) {
    const filteredRecipes = recipes.slice(0, recipesQuantity);

    return (
        <>
            <main>
                { filteredRecipes.map((recipe, index) => (
                    <div key={ index }>
                        <RecipesCard
                            type={ type }
                            id={ recipe.id }
                            title={ recipe.recipeName }
                            thumb={ recipe.thumb }
                            area={ type === 'meal'
                                ? (recipe as MealsRecipesProps).area
                                : ''
                            }
                            category={ type === 'meal'
                                ? (recipe as MealsRecipesProps).tags.join(', ')
                                : ''
                            }
                            alcoholic={ type === 'drink'
                                ? (recipe as DrinksRecipesProps).alcoholic
                                : false
                            }
                        />
                    </div>
                )) }
            </main>
        </>
    )
}
