import { detailedParams } from '@/types';
import { getMealById, getDrinkById } from '../lib/externalAPI';
import { formatResponse } from '../lib/formatResponse';
import StartRecipeButton from '../components/StartRecipeButton'; 
import Link from 'next/link';
import FavButton from '../components/FavoriteButton';

export default async function Details ({ params: { detailed } }: detailedParams) {
  const [api, id] = detailed.split('-');

  if (api !== 'meal' && api !== 'drink') return <h1>Invalid route {api}</h1>

  const fetchRecipe = api === 'meal' ? await getMealById(id) : await getDrinkById(id);
  const recipe = formatResponse(fetchRecipe, api);

  return (
    <main
      className='flex flex-col items-center gap-4 w-full'
    >
      <h1
        className='text-4xl font-semibold antialiased'
      >{recipe.title}</h1>
      <picture>
        <img
          className='rounded-md w-10/12 mx-auto'
          src={recipe.thumb as string}
          alt={recipe.title as string}
        />
      </picture>
      <div
      className='flex flex-row gap-8'
      >
        <p
          className='text-xs'
          >{`Category: ${recipe.category}`}</p>
        <p
          className='text-xs'
          >{`Tags: ${recipe.tags}`}</p>
      </div>
      <section
        className='w-9/12'
      >
        <h2
          className='text-3xl text-center uppercase'
        >
          Instructions
        </h2>
        <p
        className='text-justify'
        >
          {recipe.instructions}
        </p>
      </section>
      <h2
        className='text-2xl uppercase'
      >Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient: string, index: number) => { return (
          <li
            key={ingredient + index}
          >
            {`${recipe.measurements[index] || ''} || ${ingredient} `}
          </li>
        )})}
      </ul>

      <div
        className='aspect-video w-9/12 mb-18'
      >
        {
          api === 'drink' 
          ? <p
              className="text-center"
            >{`Type: ${recipe.isAlcoholic}`}</p> 
          : <iframe
              className='rounded-md'
              id="recipe video"
              width="100%"
              height="100%"
              title={`video recipe for ${recipe.title}`}
              src={`https://www.youtube.com/embed/${recipe.videoURL as string}`}
            />
        }
      </div>
      <Link href={`${detailed}/inProgress`}>
        <StartRecipeButton type={api} id={id} />
      </Link>
      <FavButton type={api} id={id} />
    </main>
  )
}