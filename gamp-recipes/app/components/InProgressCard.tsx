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

			className={' lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-12 overflow-y-scroll no-scrollbar  text-center flex flex-col lg:flex-row lg:justify-center font-lato    text-lg sm:text-s overflow-scroll-y no-scroll'}
		>



			<section className='text-left ml-2  lg:w-full '>

				<div
					className={'   gap-4 p-3 ml-3  mt-3 lg:shadow-none lg:justify-end lg:items-end	lg:ml-0 lg:max-w-7x lg:flex lg:flex-col lg:h-fit'}
				>

					<div className='lg:w-[672px] w-fit h-fit'>
						<h2
							className={'text-4xl font-bold antialiased list   font-lato  lg:text-black lg:font-extrabold'}
						>{inProgressData.recipe?.recipe_name}
						</h2>

						<div className='flex gap-3'>
							<h4 className='text-gray-600 font-lato  text-xl ml-1 lg:max-w-2xl    lg:  lg:text-black lg:font-semibold'>
								Category: {inProgressData.recipe?.category_name}
							</h4>


							<h4 className='text-gray-600 font-lato  text-xl ml-1 lg:max-w-2xl    lg:  lg:text-black lg:font-semibold'>
								Author: {inProgressData.recipe?.category_name}
							</h4>

							<h4 className='text-gray-600 font-lato  text-xl ml-1 lg:max-w-2xl    lg:  lg:text-black lg:font-semibold'>
								Date: {inProgressData.recipe?.category_name}
							</h4>
						</div>


					</div>



					<div className='h-fit w-fit lg:w-[672px] self-end justify-end relative'>

						<img className={'w-full shadow-md rounded-2xl lg:h-full lg:min-h-fit  lg:max-w-lg     lg:rounded-md max-w-3xl '} src={inProgressData?.recipe.image} alt={inProgressData?.recipe.recipe_name}></img>

					</div>


				</div>



			</section >

			<section className=' text-left lg:h-fit ml-2 lg:w-2/4 flex-col '>

				<div className=' flex  mt-7   lg:ml-1   '>

					<div className='self-center'>


						<FavButton
							id={inProgressData.detailed.toString()}
							ImgClass='w-full h-6 m-auto'

						/>

					</div>

					<div className={`flex   flex-row justify-center items-center ${!share ? '' : 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'} lg:self-center `}>

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



				<section
					className={'w-full my-2  ml-2 flex  '}
				>
					<IngredientList id={parseInt(inProgressData.detailed)} amount={amount} ingredients={ingredients as string[]} />
				</section>




			</section>

			<section className=' col-span-2 row-span-3 lg:mt-2 lg:border-t-2  lg:flex  lg:flex-col  lg:justify-end lg:items-center lg:border-gray-200 lg:border-solid  '>
				<div className='lg:mt-5 lg:mb-5     '>
					<section className='lg:w-[1286px]  lg:mr-40 '>
						<h2
							className={'text-3xl p-4 text-left mt-2 font-bold  font-lato lg:text-left'}
						>
							Instructions
						</h2>
						<p className={'text-2xl text-left p-4 mr-3  text-gray-600 font-lato  lg:text-left '}>{inProgressData?.recipe.instructions}</p>
					</section>
				</div>

			</section>
			{/* <div className=" my-4">
				<SnackbarProvider maxSnack={1} />
			</div> */}
		</div >


	);
}
