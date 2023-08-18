import SideMenu from "./components/SideMenu"
import LoginForm from "./components/loginForm";
import { getAllDrinks, getAllMeals } from "./lib/externalAPI";
import RecipesCard from "./components/RecipesCard";


export default async function Home() {
  const dataAllMeals = await getAllMeals()
  const dataAllDrinks = await getAllDrinks()
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
              return index < 6
                && (
                  <div key={index}>
                    <RecipesCard
                      type="meal"
                      id={idMeal}
                      title={strMeal}
                      thumb={strMealThumb}
                      area={strArea}
                      category={strCategory}
                    />
                  </div>
                )
            }) 
          }

          {
              dataAllDrinks.map(({ strDrink, idDrink, strDrinkThumb, strAlcoholic, strCategory }, index) => {
                return index < 6
                && (
                  <div key={index}>
                    <RecipesCard
                      type="drink"
                      id={idDrink}
                      title={strDrink}
                      thumb={strDrinkThumb}
                      area={strAlcoholic}
                      category={strCategory}
                    />
                  </div>
                 ) }
              ) 
          }
        </section>
      </main>
    </div>
  )
}
