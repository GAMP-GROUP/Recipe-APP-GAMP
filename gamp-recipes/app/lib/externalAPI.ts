import { MealRes, mealAPI } from "@/types"
import { MEALS_NAME_URL } from "./endpoints"


export const getAllMeals = async ():Promise<MealRes[]> => {
  const meals = await fetch(MEALS_NAME_URL)
  const data = await meals.json()
  return data.meals
}




