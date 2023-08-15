type mealProps = {
    idMeal: string,
    strMealThumb: string,
    strMeal: string,
}

export default function RecipesCard({ idMeal, strMealThumb, strMeal }: mealProps): JSX.Element {
    return (
        <div id={idMeal}>
            <h2>{strMeal}</h2>
            <picture>
                <img
                    alt={strMeal}
                    src={strMealThumb} />
            </picture>
        </div>
    )
}
