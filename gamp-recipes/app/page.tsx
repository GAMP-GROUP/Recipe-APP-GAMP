import { getAllDrinks, getAllMeals } from "./lib/externalAPI";
import RecipesFeed from "./components/RecipesFeed";

export default async function Home() {
  const dataAllMeals = await getAllMeals()
  const dataAllDrinks = await getAllDrinks()

  return (
    <div>
      <main className='h-full'>

        <section className="p">
        <RecipesFeed
          recipesQuantity={6}
          type="meal"
          recipes={dataAllMeals}
        />

        <RecipesFeed
          recipesQuantity={6}
          type="drink"
          recipes={dataAllDrinks}
        />
        </section>
      </main>
    </div>
  )
}
