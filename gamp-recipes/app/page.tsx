import SideMenu from "./components/SideMenu"
import LoginForm from "./components/loginForm";
import { getAllMeals } from "./lib/externalAPI";
import RecipesCard from "./components/RecipesCard";
import Link from "next/link";

export default async function Home() {
  const dataAllMeals = await getAllMeals()
  return (
    <div>
      <section>
        <LoginForm />
      </section>
      <SideMenu />
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
