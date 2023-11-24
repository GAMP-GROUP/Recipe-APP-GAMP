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

			className={'text-center flex flex-col items-center font-argentum  text-lg sm:text-s'}
		>
			<div>

				<section className='text-left ml-2'>

					<div className='grid grid-cols-2 gap-4'>

						<div className=''>
							<h2
								className={'text-4xl font-bold antialiased list h-10} '}
							>{inProgressData.recipe?.recipe_name}
							</h2>

							<div className='flex flex-row justify-start ml-2 w-fit'>

								<div className='flex flex-row self-center h'>


									<FavButton
										id={inProgressData.detailed.toString()}
										ImgClass='w-full h-6 m-auto'

									/>

								</div>

								<div className={`flex flex-row justify-center items-center ${!share ? '' : 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'} `}>

									<ShareToSocialCard
										id={inProgressData.detailed.toString()}
										url={`https://gamp.vercel.app/${inProgressData.detailed}`}
										img={inProgressData?.recipe.image as string}
									/>


								</div>
							</div>
						</div>

						<div className='h-32 p-2'>
							<picture >
								<img className={'h-full w-full shadow-md rounded-lg'} src={inProgressData?.recipe.image} alt={inProgressData?.recipe.recipe_name}></img>
							</picture>
						</div>





					</div>

				</section>


				<section className='flex flex-col justify-start'>
					<h2
						className={'text-3xl text-left p-3 ml-2  w-fit'}
					>
						Instructions
					</h2>
					<p className={'text-xl text-left p-3 ml-2 '}>{inProgressData?.recipe.instructions}</p>
				</section>



				<section
					className={'w-3/4 my-2 p-3 ml-2 '}
				>
					<IngredientList id={parseInt(inProgressData.detailed)} amount={amount} ingredients={ingredients as string[]} />
				</section>
			</div>


		</div >
	);
}
