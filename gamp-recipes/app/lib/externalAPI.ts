import { DrinkRes, MealRes } from "@/types"
import { DRINKS_NAME_URL, MEALS_NAME_URL } from "./endpoints"


export const getAllMeals = async ():Promise<MealRes[]> => {
  const meals = await fetch(MEALS_NAME_URL)
  const data = await meals.json()
  return data.meals
}

export const getAllDrinks = async ():Promise<DrinkRes[]> => {
  const drinks = await fetch(DRINKS_NAME_URL)
  const data = await drinks.json()
  return data.drinks
}





