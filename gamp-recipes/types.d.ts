import { ChangeEvent } from 'react';

type UserProps = {
  username:string
  email: string
  password:string 
}

type ContextUser = {
  logging: boolean
  user:UserProps 
  handleLoginCardDisplay:() => void
  handleInputChange: (event:ChangeEvent<HTMLInputElement>) => void
}

type detailedParams = {
  params: { detailed: string }
}

type mealProps = {
  idMeal: string,
  strMealThumb: string,
  strMeal: string,
}

type ContextMeals = {
  allRecipes: MealRes[],
}

type externalAPI = drinkAPI | mealAPI

type externalRes = MealRes[] | DrinkRes[]

type drinkAPI = {
  [drinks: string]: externalRes,
}

type ButtonProps = {
  id: string,
  type: string,
}

type mealAPI = {
  [meals: string]: externalRes,
}
type MealRes = {
  'idMeal': string,
  'strMeal': string,
  'strDrinkAlternate': string | null,
  'strCategory': string,
  'strArea': string,
  'strInstructions': string,
  'strMealThumb': string,
  'strTags': string,
  'strYoutube': string,
  'strSource': string | null,
  'strImageSource': string | null,
  'strCreativeCommonsConfirmed': string | null,
  'dateModified': string | null,
  [index: string]: string,
}

type DrinkRes = {
  'idDrink': string,
  'strDrink': string,
  'strDrinkAlternate': null | string,
  'strTags': string,
  'strVideo': null | string,
  'strCategory': string,
  'strIBA': string,
  'strAlcoholic': string,
  'strGlass': string,
  'strInstructions': string
  'strInstructionsES': null | string,
  'strInstructionsDE': null | string,
  'strInstructionsFR': null | string,
  'strInstructionsIT': null | string,
  'strInstructionsZH-HANS': null | string,
  'strInstructionsZH-HANT': null | string,
  'strDrinkThumb': string,
  'strImageSource': string,
  'strImageAttribution': string,
  'strCreativeCommonsConfirmed': null | string,
  'dateModified': null | string,
  [index: string]: string,
}
