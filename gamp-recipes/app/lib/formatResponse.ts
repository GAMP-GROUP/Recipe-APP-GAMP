import { MealRes, DrinkRes } from "@/types";

type FormatRecipe = {
  type: string,
  category: string,
  instructions: string,
  tags: string,
  id: string,
  title: string,
  thumb: string,
  ingredients: string[],
  measurements: string[],
  isAlcoholic: string,
  videoURL: string,
}

export function formatResponse(recipe: MealRes | DrinkRes, api: string): FormatRecipe{
  const detailed = recipe;
  const inDrink = api === 'drink';
  const render = new Map<string, string | string[]>([
    ["type", api],
    ["category", detailed.strCategory],
    ["instructions", detailed.strInstructions],
    ["tags", detailed.strTags],
    ["id", inDrink ? detailed.idDrink : detailed.idMeal],
    ["title", inDrink ? detailed.strDrink : detailed.strMeal],
    ["thumb", inDrink ? detailed.strDrinkThumb : detailed.strMealThumb],
  ]);
  inDrink
  ? render.set("isAlcoholic", detailed.strAlcoholic) 
  : render.set("videoURL", detailed.strYoutube.split('=')[1])
  const range = api === 'drink' ? 15 : 20
  const measurements = []
  const ingredients = []
  for (let i = 1; i <= range; i += 1) {
    const strIng = "strIngredient" + i;
    const strMes = 'strMeasure' + i;
    const ingRef = strIng in detailed ? detailed[strIng] : null;
    if (ingRef !== null && ingRef !== undefined && ingRef !== '') {
      ingredients.push(detailed[strIng]);
      measurements.push(detailed[strMes]);
    }
  }
  render.set("ingredients", ingredients);
  render.set("measurements", measurements)
  return Object.fromEntries(render) as FormatRecipe;
}