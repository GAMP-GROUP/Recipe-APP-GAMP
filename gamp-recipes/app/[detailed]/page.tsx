import { externalAPI, detailedParams } from '@/types';



export default async function Details ({ params: { detailed } }: detailedParams) {
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
    : render.set("videoURL", detailed.strYoutube.split('=')[1])
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

  const mealURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  const drinkURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  const req = api === 'meal' ? await fetch(mealURL) : await fetch(drinkURL);
  const res = await req.json()
  const recipe = formatResponse(res);
  const ingredients = recipe.get("ingredients") as string[];
  const measurements = recipe.get("measurements") as string[];

  return (
    <main
      className='flex flex-col items-center gap-4'
    >
      <h1
        className='text-4xl font-semibold antialiased'
      >{recipe.get("title")}</h1>
      <picture>
        <img
          className='rounded-md w-10/12 mx-auto'
          src={recipe.get("thumb") as string}
          alt={recipe.get("title") as string}
        />
      </picture>
      <div
      className='flex flex-row gap-8'
      >
        <p
          className='text-xs'
          >{`Category: ${recipe.get("category")}`}</p>
        <p
          className='text-xs'
          >{`Tags: ${recipe.get("tags")}`}</p>
      </div>
      <section
        className='w-9/12'
      >
        <h2
          className='text-2xl text-center'
        >
          INSTRUCTIONS
        </h2>
        <p
        className='text-justify'
        >
          {recipe.get("instructions")}
        </p>
      </section>
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

      <div
        className='wd-10/12 mx-auto'
      >
        {
          api === 'drink' 
          ? <p>{`Type: ${recipe.get('isAlcoholic')}`}</p> 
          : <iframe
              className='rounded-md'
              id="recipe video"
              title={`video recipe for ${recipe.get('title')}`}
              width="300"
              height="190"
              src={`https://www.youtube.com/embed/${recipe.get("videoURL") as string}`}
            />
        }
      </div>
    </main>
  )
}