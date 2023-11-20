'use client';

import React from 'react';
import { RecipeData } from '@/types';
import IngredientList from '@/app/components/IngredientLIst';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import FavButton from '@/app/components/FavoriteButton';
import ShareToSocialCard from '@/app/components/ShareToSocialCard';

type inProgressData =
	{
		recipe: RecipeData,
		detailed: string
	};
export default function InProgressCard(inProgressData: inProgressData) {

	const { share } = useBehaviorContext();


	const ingredients = inProgressData.recipe?.ingredients.map(({ ingredient: { ingredients_name } }) => {
		const ingName = ingredients_name.charAt(0).toUpperCase() + ingredients_name.slice(1);
		return ingName;
	});

	// const mainModalClass = !share ? 'text-center flex flex-col items-center' : 'text-center flex flex-col items-center opacity-2';

	return (
		<div

			className={'text-center flex flex-col items-center'}
		>
			<div>

				<picture>
					<img className={!share ? 'w-full mx-auto  h-fit' : 'w-full mx-auto  h-fit opacity-25'} src={inProgressData?.recipe.image} alt={inProgressData?.recipe.recipe_name}></img>
				</picture>

				<h2
					className={!share ? 'text-4xl font-semibold antialiased list' : 'text-4xl font-semibold antialiased list opacity-25'}
				>{inProgressData.recipe?.recipe_name}</h2>

				<div className='flex flex-row justify-center'>

					<FavButton
						id={inProgressData.detailed.toString()}

					/>

					<ShareToSocialCard
						id={inProgressData.detailed.toString()}
						url={`https://gamp.vercel.app/${inProgressData.detailed}`}
						img={inProgressData?.recipe.image as string}
					/>

				</div>

				<h2
					className={!share ? 'text-3xl text-center uppercase' : 'text-3xl text-center uppercase'}
				>
					Instructions
				</h2>
				<p className='text-center'>{inProgressData?.recipe.instructions}</p>
			</div>

			<section
				className={!share ? 'w-3/4' : 'w-3/4 '}
			>
				<IngredientList ingredients={ingredients as string[]} />
			</section>
		</div >
	);
}
