type mealProps = {
    idMeal: string,
    strMealThumb: string,
    strMeal: string,
    strArea: string,
    strCategory: string,
}

export default function RecipesCard({ idMeal, strMealThumb, strMeal,strArea, strCategory }: mealProps): JSX.Element {
    return (
        <div className="p-6 text-center" id={idMeal}>      
            <picture>
                <img
                    className="rounded-lg"
                    alt={strMeal}
                    src={strMealThumb} />
            </picture>
            <section className="flex">
            <h2 className="inline-flex mt-2 mx-4 my-1">{strMeal}</h2>
            <section className="m-1">
            <h2 className="px-1 flex-2 mx-12 text-[10px] m-1 rounded-md bg-orange-300">{strArea}</h2>
            <h2 className="px-1 flex-2 mx-12 text-[10px] m-1 rounded-md bg-purple-200 shadow-xl">{strCategory}</h2>
            </section>
            </section>
        </div>
    )
}
