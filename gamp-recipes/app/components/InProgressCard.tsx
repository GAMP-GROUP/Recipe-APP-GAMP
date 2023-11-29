'use client';

import React from 'react';
import { RecipeData } from '@/types';
import IngredientList from '@/app/components/IngredientLIst';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import FavButton from '@/app/components/FavoriteButton';
import ShareToSocialCard from '@/app/components/ShareToSocialCard';
import { SnackbarProvider } from 'notistack';



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


		return { ingredients, amount };
	};

	const { ingredients, amount } = getIngredientsAndAmount();





	return (
		<div

			className={'text-center flex flex-col lg:flex-row lg:justify-center font-lato  overflow-y-scroll no-scrollbar  text-lg sm:text-s'}
		>



			<section className='text-left ml-2 lg:w-full '>

				<div
					className={'grid grid-cols-2 gap-4 p-3 ml-3 lg:ml-10 mt-3 mr-5 lg:shadow-none  lg:max-w-full lg:min-w-full lg:-mt-12 lg:flex lg:flex-col lg:h-[1000px]'}
				>

					<div className='lg:grid-cols-2 h-fit lg:relative lg:z-10 lg:ml-4 lg:top-2/4 lg:opacity-100'>
						<h2
							className={'text-4xl font-bold antialiased list h-10 lg:ml-3 font-lato lg:mt-28 lg:w-fit  lg:text-white lg:font-extrabold'}
						>{inProgressData.recipe?.recipe_name}
						</h2>


						<h4 className='text-gray-600 font-lato  text-xl ml-1 lg:max-w-2xl   lg:h-fit  lg: lg:ml-3 lg:text-white lg:font-semibold'>
							{inProgressData.recipe?.category_name}, {inProgressData.recipe?.recipe_type_name} , {ingredients.map((ing, index) => {
								if (index === ingredients.length - 1) {
									return ing;
								}
								return `${ing}, `;
							}
							)}
						</h4>

						<div className=' flex  mt-7   lg:ml-1   '>

							<div className='self-center'>


								<FavButton
									id={inProgressData.detailed.toString()}
									ImgClass='w-full h-6 m-auto'

								/>

							</div>

							<div className={`flex  flex-row justify-center items-center ${!share ? '' : 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'} lg:self-center `}>

								<ShareToSocialCard
									id={inProgressData.detailed.toString()}
									url={`https://gamp.vercel.app/${inProgressData.detailed}`}
									img={inProgressData?.recipe.image as string}
								/>


							</div>
							<div>
								<h4 className='text-black font-lato  text-xl ml-1 lg:max-w-2xl  lg:ml-3 lg:text-black lg:font-semibold'>
									created by gabriel
								</h4>
							</div>
						</div>
					</div>

					<div className='h-fit w-fit lg:bg-black lg:absolute lg:-z-10  lg:w-[701px] lg:h-[701px] '>

						<img className={'w-full shadow-md rounded-2xl lg:h-full  lg:w-full lg:opacity-75 lg:rounded-md max-w-3xl '} src={inProgressData?.recipe.image} alt={inProgressData?.recipe.recipe_name}></img>

					</div>

				</div>

			</section >

			<section className=' text-left ml-2 lg:w-2/4 flex-col '>


				<section className='w-fit lg:items-center lg:border-b-4 lg:border-gray-100 lg:border-solid lg:w-fit	'>
					<h2
						className={'text-3xl text-left mt-2 ml-5 font-bold  font-lato lg:text-left'}
					>
						Instructions
					</h2>
					<p className={'text-2xl text-left p-4 ml-3 mr-3  text-gray-600 font-lato  lg:text-left max-w-3xl'}>{inProgressData?.recipe.instructions}</p>
				</section>


				<section
					className={'w-full my-2  ml-2 flex  '}
				>
					<IngredientList id={parseInt(inProgressData.detailed)} amount={amount} ingredients={ingredients as string[]} />
				</section>
			</section>
			<div className=" my-4">
				<SnackbarProvider maxSnack={1} />
			</div>
		</div >


	);
}
