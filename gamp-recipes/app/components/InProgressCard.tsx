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


	const getIngredientsAndAmount = () => {
		const ingredients = inProgressData.recipe?.ingredients.map(({ ingredient: { ingredients_name } }) => {
			const ingName = ingredients_name.charAt(0).toUpperCase() + ingredients_name.slice(1);
			return ingName;
		});

		const amount = inProgressData.recipe?.ingredients.map(({ ing_amount }) => {
			return ing_amount;
		}
		);
		console.log('32-card', amount);

		return { ingredients, amount };
	};

	const { ingredients, amount } = getIngredientsAndAmount();

	// const ingredients = inProgressData.recipe?.ingredients.map(({ ingredient: { ingredients_name } }) => {
	// 	const ingName = ingredients_name.charAt(0).toUpperCase() + ingredients_name.slice(1);
	// 	return ingName;
	// });

	// const amount = inProgressData.recipe?.ingredients.map(({ ing_amount }) => {
	// 	return ing_amount;
	// }
	// );



	return (
		<div

			className={'text-center flex flex-col items-center font-croissant text-lg sm:text-s'}
		>
			<div>

				<picture>
					<img className={'h-36 w-full object-cover shadow-md'} src={inProgressData?.recipe.image} alt={inProgressData?.recipe.recipe_name}></img>
				</picture>

				<h2
					className={`text-4xl font-semibold antialiased list ${!share ? '' : 'opacity-25'}`}
				>{inProgressData.recipe?.recipe_name}</h2>

				<div className='flex flex-row justify-center'>

					<div className='flex flex-row self-center'>


						<FavButton
							id={inProgressData.detailed.toString()}

						/>
						<span className='ml-2'>Share</span>
					</div>

					<div className={`flex flex-row justify-center items-center ${!share ? '' : 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'} `}>

						<ShareToSocialCard
							id={inProgressData.detailed.toString()}
							url={`https://gamp.vercel.app/${inProgressData.detailed}`}
							img={inProgressData?.recipe.image as string}
						/>
						<span className='ml-2'>Favorite</span>

					</div>
				</div>

				<h2
					className={'text-3xl text-center  '}
				>
					Instructions
				</h2>
				<p className={'text-lg sm:text-sm text-left  p-3 ml-4 font-croissant'}>{inProgressData?.recipe.instructions}</p>
			</div>

			<section
				className={'w-3/4 my-2'}
			>
				<IngredientList id={parseInt(inProgressData.detailed)} amount={amount} ingredients={ingredients as string[]} />
			</section>



		</div >
	);
}
