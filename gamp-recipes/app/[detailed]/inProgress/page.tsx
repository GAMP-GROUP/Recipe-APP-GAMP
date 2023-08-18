import { formatResponse } from '@/app/lib/formatResponse';
import { getMealById, getDrinkById } from '@/app/lib/externalAPI';
import Image from 'next/image';
import { detailedParams } from "@/types"

export default async function InProgress({ params: { detailed } }: detailedParams) {

  const [api, id] = detailed.split('-');

  if (api !== 'meal' && api !== 'drink') return <h1>Invalid route {api}</h1>

  const fetchRecipe = api === 'meal' ? await getMealById(id) : await getDrinkById(id);
  const recipe = formatResponse(fetchRecipe, api);

  return (
    <div>
      <section>

        <picture>
        <img src={recipe.thumb} alt='recipe image'></img>
        </picture>
        <h2>{recipe.title}</h2>
        <br />
        
        <p>
          {recipe.instructions}
        </p>

      </section>

    <section>
    <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
      {
        recipe.ingredients.map((ingredient, index) => {
          return (
      
    <li className="flex items-center space-x-3" key={index}>
        <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
        </svg>
        <span>{ingredient}</span>
    </li>
          )
      })
}
</ul>

    </section>

    </div>
  )
}