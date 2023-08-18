import UserMenu from "./components/UserMenu"
import LoginForm from "./components/LoginForm";
import RecipesCard from "./components/RecipesCard";
import SearchBar from "./components/SearchBar";
import { getAllMeals } from "./lib/externalAPI";
// import Link from "next/link";

export default async function Home() {
  const dataAllMeals = await getAllMeals()
  return (
    <div>
      <LoginForm />
      <UserMenu />
      <SearchBar />
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
