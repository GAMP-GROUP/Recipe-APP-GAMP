import { ChangeEvent } from "react"
import { UserProps } from "./user.props"


type UserProps = {
  username:string
  email: string
  password:string 
}

type ContextUser = {
  user:UserProps  | null,
  handleInputChange: (event:ChangeEvent<HTMLInputElement>) => void
}

type externalAPI = drinkAPI | mealAPI

type externalRes = MealRes[] | DrinkRes[]

type drinkAPI = {
  [drinks: string]: externalRes,
}

type mealAPI = {
  [meals: string]: externalRes,
}

type MealRes = {
  "idMeal": string,
  "strMeal": string,
  "strDrinkAlternate": string | null,
  "strCategory": string,
  "strArea": string,
  "strInstructions": string,
  "strMealThumb": string,
  "strTags": string,
  "strYoutube": string,
  "strIngredient1": string | null,
  "strIngredient2": string | null,
  "strIngredient3": string | null,
  "strIngredient4": string | null,
  "strIngredient5": string | null,
  "strIngredient6": string | null,
  "strIngredient7": string | null,
  "strIngredient8": string | null,
  "strIngredient9": string | null,
  "strIngredient10": string | null,
  "strIngredient11": string | null,
  "strIngredient12": string | null,
  "strIngredient13": string | null,
  "strIngredient14": string | null,
  "strIngredient15": string | null,
  "strIngredient16": string | null,
  "strIngredient17": string | null,
  "strIngredient18": string | null,
  "strIngredient19": string | null,
  "strIngredient20": string | null,
  "strMeasure1": string | null,
  "strMeasure2": string | null,
  "strMeasure3": string | null,
  "strMeasure4": string | null,
  "strMeasure5": string | null,
  "strMeasure6": string | null,
  "strMeasure7": string | null,
  "strMeasure8": string | null,
  "strMeasure9": string | null,
  "strMeasure10":string | null,
  "strMeasure11": string | null,
  "strMeasure12": string | null,
  "strMeasure13": string | null,
  "strMeasure14": string | null,
  "strMeasure15": string | null,
  "strMeasure16": string | null,
  "strMeasure17": string | null,
  "strMeasure18": string | null,
  "strMeasure19": string | null,
  "strMeasure20": string | null,
  "strSource": string | null,
  "strImageSource": string | null,
  "strCreativeCommonsConfirmed": string | null,
  "dateModified": string | null,
  [index: string]: string,
}

type DrinkRes = {
  idDrink: string,
  strDrink: string,
  strDrinkAlternate: null | string,
  strTags: string,
  strVideo: null | string,
  strCategory: string,
  strIBA: string,
  strAlcoholic: string,
  strGlass: string,
  strInstructions: string
  strInstructionsES: null | string,
  strInstructionsDE: null | string,
  strInstructionsFR: null | string,
  strInstructionsIT: null | string,
  "strInstructionsZH-HANS": null | string,
  "strInstructionsZH-HANT": null | string,
  strDrinkThumb: string,
  strIngredient1: null | string,
  strIngredient2: null | string,
  strIngredient3: null | string,
  strIngredient4: null | string,
  strIngredient5: null | string,
  strIngredient6: null | string,
  strIngredient7: null | string,
  strIngredient8: null | string,
  strIngredient9: null | string,
  strIngredient10: null | string,
  strIngredient11: null | string,
  strIngredient12: null | string,
  strIngredient13: null | string,
  strIngredient14: null | string,
  strIngredient15: null | string,
  strMeasure1: null | string,
  strMeasure2: null | string,
  strMeasure3: null | string,
  strMeasure4: null | string,
  strMeasure5: null | string,
  strMeasure6: null | string,
  strMeasure7: null | string,
  strMeasure8: null | string,
  strMeasure9: null | string,
  strMeasure10: null | string,
  strMeasure11: null | string,
  strMeasure12: null | string,
  strMeasure13: null | string,
  strMeasure14: null | string,
  strMeasure15: null | string,
  strImageSource: string,
  strImageAttribution: string,
  strCreativeCommonsConfirmed: null | string,
  dateModified: null | string,
  [index: string]: string,
}