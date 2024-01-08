'use client';
import React from 'react';
import { RecipeData } from '@/types';
import IngredientList from '@/app/components/IngredientList';
import FavButton from '@/app/components/FavoriteButton';
import ShareToSocialCard from '@/app/components/ShareToSocialCard';
import { SnackbarProvider } from 'notistack';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';

type inProgressData = {
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
			<p key={index} className={'text-lg max-w-4xl text-left p-2 xl:-ml-1 text-gray-600 font-lato  m xl:min-w-[896px] xl:text-left '}>{instruction}</p>
		);
	}
	);

	return (
		<div

			className={' bg-slate-50 ml-7 mr-7 mt-2  xl:w-fit xl:w-screen xl:ml-10 xl:mr-10 xl:grid xl:grid-cols-2 xl:grid-rows-1 overflow-hidden overflow-y-scroll  no-scrollbar  text-center flex flex-col  xl:justify-center font-lato     text-lg sm:text-s overflow-scroll-y no-scroll'}

		>
			<section className='text-left     xl:justify-end  xl:flex xl:justify-end xl:items-center order-1 '>
				<div
					className={' gap-4  ml-3 sm:10 mb-5 min-h-min xl:shadow-none xl:ml-4 w-fit xl:justify-end xl:items-center	 xl:max-w-7x xl:flex xl:flex-col xl:h-fit'}
				>
					<div className='xl:flex xl:justify-end mr-20  items-center xl:w-[672px] '>
						<div className='xl:max-w-[360] xl:w-[360px] xl:min-w-[360px] flex flex-col justify-start items-start h-fit'>
							<h2
								className={'text-2xl font-bold antialiased list  font-lato  xl:text-gray-700 xl:font-extrabold'}
							>{inProgressData.recipe?.recipe_name}
							</h2>
							<div className='flex gap-2 xl:mb-2'>
								<h4 className='text-gray-600 font-lato  text-md  xl:max-w-2xl    xl:  xl:text-gray-500 xl:font-semibold'>
									Category:   <span className='text-gray-700 font-semibold mr-1'>{inProgressData.recipe?.category_name} </span>
									Author:   <span className='text-gray-700 font-semibold'>{author} </span>
									Date:   <span className='text-gray-700  ml-1 font-semibold'>{formattedDate} </span>
								</h4>
							</div>
						</div>
					</div>
					<div className='xl:h-fit xl:w-[672px] flex max-w-xs  xl:max-w-2xl xl:flex xl:justify-end mr-20  xl:items-center xl:-mt-5'>
						<img className={'  shadow-md rounded-sm xl:h-80 xl:w-[360px] w-60  xl:rounded-sm xl:max-w-3xl max-w-xs '} src={inProgressData?.recipe.image} alt={inProgressData?.recipe.recipe_name}></img>
					</div>
					<div className='xl:w-[672px] xl:self-end xl:mr-2 xl:-mt-3    mb-5 min-h-min'>
						<div className=' flex  xl:justify-center xl:items-center gap-1  '>
							<div className='flex gap-2'>
								<FavButton
									id={inProgressData.detailed.toString()}
									ImgClass='w-full h-6 m-auto'
								/>
							</div>
							<div className={`flex   flex-row justify-center items-center ${!share ? '' : 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'} xl:self-center `}>
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
			<div className=' text-left  xl:h-fit ml-2 xl:w-full justify-center  flex flex-col order-3 xl:order-2 '>
				<section
					className={'  w-[358px] -ml-2 xl:-ml-0 xl:flex xl:self-start xl:w-3/4 xl:justify-start  xl:flex xl:mt-0 xl:items-center xl:min-h-[432px]'}
				>
					<IngredientList id={parseInt(inProgressData.detailed)} amount={amount as unknown as string[]} ingredients={ingredients as string[]} />
				</section>
			</div>
			<section className=' col-span-2 xl:ml-2  row-span-3 xl:mt-2  order-2  xl:border-t-2  xl:flex  xl:flex-col  xl:justify-end xl:items-center xl:border-gray-200 xl:border-solid  '>
				<div className='xl:mb-5 xl:mr-2  xl:max-w-4xl  '>
					<section className='xl:w-full '>
						<h2
							className={'xl:text-xl ml-2 text-2xl   text-left mt-2 xl:ml-1 font-bold text-gray-700 font-lato xl:text-left'}
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
