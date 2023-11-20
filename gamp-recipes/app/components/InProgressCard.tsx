'use client';
'use client';

import React from 'react';
import { RecipeData } from '@/types';
import IngredientList from '@/app/components/IngredientLIst';

import FavButton from '@/app/components/FavoriteButton';


import ShareToSocialCard from '@/app/components/ShareToSocialCard';

type inProgressData =
	{
		recipe: RecipeData,
		detailed: string
	};
export default async function InProgressCard(inProgressData: inProgressData) {



	const ingredients = inProgressData.recipe?.ingredients.map(({ ingredient: { ingredients_name } }) => {
		const ingName = ingredients_name.charAt(0).toUpperCase() + ingredients_name.slice(1);
		return ingName;
	});

	return (
		<div
			className="text-center flex flex-col items-center"
		>
			<section>

				<picture>
					<img className="w-full mx-auto  h-fit" src={inProgressData?.recipe.image} alt={inProgressData?.recipe.recipe_name}></img>
				</picture>

				<h2
					className='text-4xl font-semibold antialiased'
				>{inProgressData.recipe?.recipe_name}</h2>

				<section className='flex flex-row justify-center'>

					<FavButton
						id={inProgressData.detailed.toString()}

					/>

					<ShareToSocialCard
						id={inProgressData.detailed.toString()}
						url={`https://gamp.vercel.app/${inProgressData.detailed}`}
						img={inProgressData?.recipe.image as string}
					/>

				</section>

				<h2
					className='text-3xl text-center uppercase'
				>
					Instructions
				</h2>
				<p className='text-center'>{inProgressData?.recipe.instructions}</p>
			</section>

			<section
				className='w-3/4'
			>
				<IngredientList ingredients={ingredients as string[]} />
			</section>
		</div >
	);
}
