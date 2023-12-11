'use client';
import React from 'react';
import { RecipeData } from '@/types';
import IngredientList from '@/app/components/IngredientList';
import FavButton from '@/app/components/FavoriteButton';
import ShareToSocialCard from '@/app/components/ShareToSocialCard';
import { SnackbarProvider } from 'notistack';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';

type inProgressData =
	{
		recipe: RecipeData,
		detailed: string
	};
export default function InProgressCard(inProgressData: inProgressData) {




	const timestampObj: Date = new Date(inProgressData.recipe.updated_at);

	const formattedDate: string = timestampObj.toLocaleDateString('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});


	let author = inProgressData.recipe?.author;

	if (inProgressData.recipe.author === null || inProgressData.recipe.author === '' || inProgressData.recipe.author === undefined) {
		author = 'Jacquin';
	}


	const { share } = useBehaviorContext();


	const getIngredientsAndAmount = () => {

		const ingredients = inProgressData.recipe?.ingredients.map((item) => {
			const ingredients_name = item?.ingredient?.ingredients_name;

			if (ingredients_name) {
				const ingName = ingredients_name.charAt(0).toUpperCase() + ingredients_name.slice(1);
				return ingName;
			}
			return null;
		});


		const amount = inProgressData.recipe?.ingredients.map((ingredient) => {
			return ingredient?.ing_amount;
		});


		if (amount === undefined) {
			return { ingredients, amount: [] };
		}
		return { ingredients, amount };
	};


	const { ingredients, amount } = getIngredientsAndAmount();

	const instructions = inProgressData.recipe?.instructions.split('\n').map((instruction, index) => {
		return (
			<p key={index} className={'text-lg max-w-4xl text-left p-2 lg:-ml-1 text-gray-600 font-lato  m lg:min-w-[896px] lg:text-left '}>{instruction}</p>
		);
	}
	);


	return (
		<div

			className={ 'bg-slate-50 ml-7 mr-7 mt-2 lg:h-max pb-10  h-full lg:mb-5   lg:w-max xl:w-screen lg:ml-10 lg:mr-10 lg:grid lg:grid-cols-2 lg:grid-rows-1 overflow-hidden overflow-y-scroll  no-scrollbar  text-center flex flex-col  lg:justify-center font-lato     text-lg sm:text-s overflow-scroll-y no-scroll'}

		>


			<section className='text-left     xl:justify-end  lg:flex lg:justify-end lg:items-center order-1 '>
				<div
					className={' gap-4   ml-3 sm:10 mb-5 min-h-min lg:shadow-none lg:ml-4 w-fit lg:justify-end lg:items-center	 lg:max-w-7x lg:flex lg:flex-col lg:h-fit'}
				>
					<div className='lg:flex lg:justify-end mr-20  items-center lg:w-[672px] '>
						<div className='lg:max-w-[360] lg:w-[360px] lg:min-w-[360px] flex flex-col justify-start items-start h-fit'>
							<h2
								className={'text-2xl font-bold antialiased list lg:mb-2  font-lato  lg:text-gray-700 lg:font-extrabold'}
							>{inProgressData.recipe?.recipe_name}
							</h2>
							<div className='flex gap-2 lg:mb-2'>
								<h4 className='text-gray-600 font-lato  text-md  lg:max-w-2xl    lg:  lg:text-gray-500 lg:font-semibold'>
									Category:   <span className='text-gray-700 font-semibold mr-1'>{inProgressData.recipe?.category_name} </span>
									Author:   <span className='text-gray-700 font-semibold'>{author} </span>
									Date:   <span className='text-gray-700  ml-1 font-semibold'>{formattedDate} </span>
								</h4>


							</div>
						</div>
					</div>
					<div className='lg:h-fit lg:w-[672px] flex max-w-xs  lg:max-w-2xl lg:flex lg:justify-end mr-20  lg:items-center lg:-mt-5'>
						<img className={'  shadow-md rounded-sm lg:h-80 lg:w-[360px] w-60  lg:rounded-sm lg:max-w-3xl max-w-xs '} src={inProgressData?.recipe.image} alt={inProgressData?.recipe.recipe_name}></img>
					</div>
					<div className='lg:w-[362px]  lg:mr-2 lg:-mt-3    mb-5 min-h-min'>
						<div className=' flex  lg:justify-center lg:items-center gap-1  '>
							<div className='flex gap-2'>
								<FavButton
									id={inProgressData.detailed.toString()}
									ImgClass='w-full h-6 m-auto'
									btnClass=' w-full'
								/>
							</div>

							<div className={`flex   flex-row justify-center items-center ${!share ? '' : 'absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 '} lg:self-center `}>
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
			<div className=' text-left  lg:h-fit ml-2 lg:w-full justify-center  flex flex-col order-3 lg:order-2 '>
				<section
					className={'  w-[358px] -ml-2 lg:-ml-0 xl:flex xl:self-start xl:w-3/4 lg:justify-start  lg:flex lg:mt-0 lg:items-center lg:min-h-[432px]'}
				>
					<IngredientList id={parseInt(inProgressData.detailed)} amount={amount as unknown as string[]} ingredients={ingredients as string[]} />
				</section>
			</div>
			<section className=' col-span-2 lg:ml-2  row-span-3 lg:mt-2  order-2  lg:border-t-2  lg:flex  lg:flex-col  lg:justify-end lg:items-center lg:border-gray-200 lg:border-solid  '>
				<div className=' lg:mr-2  lg:max-w-4xl lg:mb-10 '>
					<section className='lg:w-full '>
						<h2
							className={'lg:text-xl ml-2 text-2xl    text-left mt-2 lg:ml-1 font-bold text-gray-700 font-lato lg:text-left'}
						>
							Instructions
						</h2>
						{instructions}
					</section>
				</div>
			</section>
			<div className=" my-4 order-last">
				<SnackbarProvider maxSnack={1} />
			</div>
		</div >
	);
}