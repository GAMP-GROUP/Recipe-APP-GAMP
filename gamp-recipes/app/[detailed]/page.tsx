import { externalAPI, drinkAPI, mealAPI } from '@/types';

type params = {
  params: { detailed: string }
}

export default async function Details ({ params: { detailed } }: params) {
  const [api, id] = detailed.split('-');

  if (api !== 'meal' && api !== 'drink') return <h1>Invalid route {api}</h1>
  
  function formatResponse(recipe: externalAPI) {
    const type = Object.keys(recipe)[0];
    const detailed = recipe[type][0];
    const inDrink = "idDrink" in detailed;
    const render = new Map<string, string | string[]>([
      ["type", type],
      ["category", detailed.strCategory],
      ["instructions", detailed.strInstructions],
      ["tags", detailed.strTags],
      ["id", inDrink ? detailed.idDrink : detailed.idMeal],
      ["title", inDrink ? detailed.strDrink : detailed.strMeal],
      ["thumb", inDrink ? detailed.strDrinkThumb : detailed.strMealThumb],
    ]);
    inDrink
    ? render.set("isAlcoholic", detailed.strAlcoholic) 
    : render.set("videoURL", detailed.strYoutube)
    const range = type === 'drinks' ? 15 : 20
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
    return render
  }
  const mealURL =  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  const drinkURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  const req = api === 'meal' ? await fetch(mealURL) : await fetch(drinkURL);
  const res = await req.json()
  const recipe = formatResponse(res);
  const ingredients = recipe.get("ingredients") as string[];
  const measurements = recipe.get("measurements") as string[];

  return (
    <>
      <p>{id}</p>
      <h1>{recipe.get("title")}</h1>
      <picture>
        <img 
          src={recipe.get("thumb") as string}
          alt={recipe.get("title") as string}
          height={100}
          width={100}
        />
      </picture>
      <p>{`Category: ${recipe.get("category")}`}</p>
      <p>{`Instructions: ${recipe.get("instructions")}`}</p>

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, index) => { return (
          <li
            key={ingredient + index}
          >
            {`${measurements[index] || ''} || ${ingredient} `}
          </li>
        )})}
      </ul>
    </>
  )
}