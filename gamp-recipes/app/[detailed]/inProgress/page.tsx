import React from 'react';
import { detailedParams } from '@/types';
import IngredientList from '@/app/components/IngredientLIst';
import prisma from '@/prisma/client';
import FavButton from '@/app/components/FavoriteButton';

import ShareToSocialCard from '@/app/components/ShareToSocialCard';


export default async function InProgress({
	params: { detailed },
}: detailedParams) {


	const recipe = await prisma.recipes.findUnique({
		where: {
			id: Number(detailed),
		},
		include: {
			Ingredients_Recipes: {
				include: {
					ingredient: {
						select: {
							ingredients_name: true,
						}
					},
				}
			}
		}
	});

	const ingredients = recipe?.Ingredients_Recipes.map(({ ingredient: { ingredients_name } }) => {
		const ingName = ingredients_name.charAt(0).toUpperCase() + ingredients_name.slice(1);
		return ingName;
	});

	return (
		<div
			className="text-center flex flex-col items-center"
		>
			<section>

				<picture>
					<img className="w-full mx-auto  h-fit" src={recipe?.image} alt={recipe?.recipe_name}></img>
				</picture>

				<h2
					className='text-4xl font-semibold antialiased'
				>{recipe?.recipe_name}</h2>

				<section className='flex flex-row justify-center'>

					<FavButton
						id={detailed.toString()}

					/>

					<ShareToSocialCard
						id={detailed.toString()}
						url={`https://gamp.vercel.app/${detailed}`}
						img={recipe?.image as string}
					/>

				</section>

				<h2
					className='text-3xl text-center uppercase'
				>
					Instructions
				</h2>
				<p className='text-center'>{recipe?.instructions}</p>
			</section>

			<section
				className='w-3/4'
			>
				<IngredientList ingredients={ingredients as string[]} />
			</section>
		</div >
	);
}
