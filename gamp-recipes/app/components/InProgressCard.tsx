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

	const instructions = inProgressData.recipe?.instructions.split('\n').map((instruction, index) => {
		return (
			<p key={index} className={'text-lg max-w-4xl text-left p-2 mr-3  text-gray-600 font-lato  m lg:min-w-[896px] lg:text-left '}>{instruction}</p>
		);
	}
	);
	console.log(instructions);






	return (
		<div

			className={'  bg-slate-50 lg:w-fit xl:w-screen lg:ml-10 lg:mr-10 lg:grid lg:grid-cols-2 lg:grid-rows-1 overflow-hidden overflow-y-scroll  no-scrollbar  text-center flex flex-col lg:flex-row lg:justify-center font-lato    text-lg sm:text-s overflow-scroll-y no-scroll'}
		>



			<section className='text-left     xl:justify-end  flex justify-end items-center '>

				<div
					className={'   gap-4  ml-3  mb-5 min-h-min lg:shadow-none lg:ml-4 w-fit lg:justify-end lg:items-center	 lg:max-w-7x lg:flex lg:flex-col lg:h-fit'}
				>
					<div className='flex justify-end mr-20  items-center lg:w-[672px] '>

						<div className='lg:max-w-[360] lg:w-[360px] lg:min-w-[360px] flex flex-col justify-start items-start h-fit'>

							<h2
								className={'text-2xl font-bold antialiased list  font-lato  lg:text-gray-700 lg:font-extrabold'}
							>{inProgressData.recipe?.recipe_name}
							</h2>

							<div className='flex gap-2 lg:mb-2'>
								<h4 className='text-gray-600 font-lato  text-md  lg:max-w-2xl    lg:  lg:text-gray-500 lg:font-semibold'>
									Category:   <span className='text-yellow mr-1'>{inProgressData.recipe?.category_name} </span>
									Category:   <span className='text-yellow'>{inProgressData.recipe?.category_name} </span>
									Category:   <span className='text-yellow ml-1'>{inProgressData.recipe?.category_name} </span>
								</h4>

							</div>



						</div>
					</div>



					<div className='h-fit w-fit lg:w-[672px] flex justify-end mr-20 items-center lg:-mt-5'>

						<img className={'w-fit shadow-md rounded-2xl lg:h-80 lg:max-w-[360] lg:w-[360px]   lg:rounded-sm max-w-3xl '} src={inProgressData?.recipe.image} alt={inProgressData?.recipe.recipe_name}></img>

					</div>

					<div className='lg:w-[672px] self-end'>
						<div className=' flex  lg:justify-center lg:items-center gap-1  '>

							<div className='flex gap-2'>


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

						</div>
					</div>


				</div>



			</section >

			<section className=' text-left  lg:h-fit ml-2 lg:w-full justify-center  flex flex-col '>





				<section
					className={'sm:w-full sm:my-2  xl:flex xl:self-start xl:w-3/4 lg:justify-start sm:ml-2 sm:flex sm:self-center  lg:flex lg:mt-0 lg:items-center lg:min-h-[432px]'}
				>
					<IngredientList id={parseInt(inProgressData.detailed)} amount={amount} ingredients={ingredients as string[]} />
				</section>




			</section>

			<section className=' col-span-2 row-span-3 lg:mt-2 lg:border-t-2  lg:flex  lg:flex-col  lg:justify-end lg:items-center lg:border-gray-200 lg:border-solid  '>
				<div className='lg:mb-5  lg:max-w-4xl  '>
					<section className='lg:w-full g:ml-2'>
						<h2
							className={'text-2xl    text-left mt-2 lg:ml-4 font-bold text-gray-700 font-lato lg:text-left'}
						>
							Instructions
						</h2>
						{instructions}
					</section>
				</div>

			</section>
			<div className=" my-4">
				<SnackbarProvider maxSnack={1} />
			</div>
		</div >


	);
}
