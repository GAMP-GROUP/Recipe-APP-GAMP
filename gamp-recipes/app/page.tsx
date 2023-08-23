import RecipesCard from "./components/RecipesCard";
import { getAllMeals } from "./lib/externalAPI";
// import Link from "next/link";

export default async function Home() {
  const dataAllMeals = await getAllMeals()
  return (
    <div>
      <main className='h-full'>
        <section className="p">
          {
            dataAllMeals.map(({ strMeal, idMeal, strMealThumb,strArea, strCategory }, index) => {
              return index < 12
                && (
                  <div key={index}>
                    {/* <Link href={}> */}
                    <RecipesCard
                      strMeal={strMeal}
                      idMeal={idMeal}
                      strMealThumb={strMealThumb}
                      strArea={strArea}
                      strCategory={strCategory}
                    />
                    {/* </Link> */}
                  </div>
                )
            })
          }
        </section>
      </main>
    </div>
  )
}
