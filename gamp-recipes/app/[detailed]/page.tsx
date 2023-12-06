import { detailedParams } from '@/types';
import prisma from '@/prisma/client';
import React from 'react';
import StartRecipeButton from '../components/StartRecipeButton';
import FavButton from '../components/FavoriteButton';

export default async function Details({ params: { detailed } }: detailedParams) {
	const id = Number(detailed);
	console.log('9-details', id);

	const recipe = await prisma.recipes.findUnique({
		where: {
			id
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

	return (
		<div
			className='flex flex-col items-center gap-4 w-full'
		>
			<h1
				className='text-4xl font-semibold antialiased'
			>{recipe?.recipe_name}</h1>
			<picture>
				<img
					className='rounded-md w-10/12 mx-auto'
					src={recipe?.image}
					alt={recipe?.recipe_name}
				/>
			</picture>
			<div
				className='flex flex-row gap-8'
			>
			</div>
			<section
				className='w-3/4'
			>
				<h2
					className='text-3xl text-center uppercase'
				>
					Instructions
				</h2>
				<p
					className='text-center'
				>
					{recipe?.instructions}
				</p>
			</section>
			<h2
				className='text-2xl uppercase'
			>Ingredients
			</h2>
			<ul
				className='w-3/4'
			>
				{recipe?.Ingredients_Recipes.map((each) => {
					const word = each.ingredient.ingredients_name;
					const ingName = word.charAt(0).toUpperCase() + word.slice(1);
					return (
						<li
							key={each.id}
							className='flex justify-between w-full gap-8'
						>
							<span>{`${ingName}`}</span>
							<span>{`${each.ing_amount === null ? '' : each.ing_amount}`}</span>
						</li>
					);
				})}
			</ul>

			<div
				className={recipe?.recipe_type_id === 1 ? '' : 'aspect-video w-3/4'
				}>
				{
					recipe?.video_source === null
						? <p
							className="text-center"
						>{`Type: ${recipe.alcoholic}`}</p>
						: <iframe
							className='rounded-md'
							id="recipe video"
							width="100%"
							height="100%"
							title={`video recipe for ${recipe?.recipe_name}`}
							src={`https://www.youtube.com/embed/${recipe?.video_source.split('=')[1]}`}
						/>
				}
			</div>
			<div
				className='mb-8 flex flex-col items-center'
			>
				<FavButton id={id.toString()} />
				<StartRecipeButton id={id.toString()} />
			</div>
		</div>
	);
}