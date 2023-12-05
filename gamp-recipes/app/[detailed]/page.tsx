import { detailedParams } from '@/types';
import prisma from '@/prisma/client';
import React from 'react';
import ReadMore from '../components/ReadMore';
import StartRecipeButton from '../components/StartRecipeButton'; 
import FavButton from '../components/FavoriteButton';

export default async function Details ({ params: { detailed } }: detailedParams) {
	const id = Number(detailed);
	const recipe = await prisma.recipes.findUnique({
		where: {
			id 
		},
		include: {
			category_name: {
				select: { name: true }
			},
			recipe_type: {
				select: { name: true }
			},
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

	console.log(recipe);

	const titleImage = <section className="title-card w-3/4 mt-4 p-2 border-solid border border-slate-300 rounded-lg shadow-md max-w-[406px] lg:order-1 lg:w-11/12 lg:max-w-[609px] lg:self-start lg:col-span-2 lg:row-span-2">
		<div
			className='grid grid-cols-2'
		>
			<div>
				<h1
					className='text-2xl font-bold antialiased list font-lato lg:font-extrabold'
				>{recipe?.recipe_name}</h1>
				<span className='text-gray-600 font-lato  text-sm'>{recipe?.area ? recipe?.area + ' -' : null} {recipe?.category_name.name}</span>
			</div>
			<div
				className='justify-self-end self-center'
			>
				<FavButton id={id.toString()} ImgClass='w-10 h-10 mr-2' />
			</div>
		</div>	
		<picture>
			<img
				className='rounded-lg mx-auto'
				src={recipe?.image}
				alt={recipe?.recipe_name}
			/>
		</picture>
	</section>;

	return (
		<div
			className='flex flex-col m-auto items-center gap-2 w-full lg:grid lg:grid-cols-3 lg:justify-items-center lg:max-w-[1024px]'
		>
			{titleImage}
			<section
				className='w-3/4 shadow-md border-solid border border-slate-300 rounded-lg mt-4 max-w-[406px] lg:order-3 lg:self-start lg:max-h-[412px] lg:w-11/12 lg:h-[290px] overflow-auto'
			>
				<h2
					className='ml-2 text-lg text-left mt-2'
				>
          Instructions
				</h2>
				<ReadMore text={recipe?.instructions as string} />
			</section>
			<section
				className='w-3/4 border-solid border border-slate-300 rounded-lg shadow-md mt-4 max-w-[406px] lg:order-2 lg:w-11/12 lg:max-w-full lg:self-start lg:h-[290px] overflow-y-auto overflow-x-hidden'
			>
				<h2
					className='ml-2 w-full text-lg mt-2'
				>Ingredients
				</h2>
				<ul
					className='w-full'
				>
					{recipe?.Ingredients_Recipes.map((each) => {
						const word = each.ingredient.ingredients_name;
						const ingName = word.charAt(0).toUpperCase() + word.slice(1);
						return (
							<li
								key={each.id}
								className='w-full'
							>
								<span className='text-left ml-2 w-full text-sm text-gray-600 font-lato'>{`${each.ing_amount === null ? '' : each.ing_amount}`}  {`${ingName}`}</span>
							</li>
						);
					})}
				</ul>
			</section>


			{
				recipe?.video_source === null 
					? null
					: <div
						className={ recipe?.recipe_type_id === 1 ? '' : 'mt-4 aspect-video w-3/4 max-w-[406px] lg:order-4 lg:w-11/12 lg:max-w-[1024px] lg:self-start lg:col-span-3'
						}>
						<iframe
							className='rounded-lg'
							id="recipe video"
							width="100%"
							height="100%"
							title={`video recipe for ${recipe?.recipe_name}`}
							src={`https://www.youtube.com/embed/${recipe?.video_source.split('=')[1]}`}
						/>
					</div>
			}
			<div
				className='lg:col-span-3 order-5'
			>
				<StartRecipeButton id={id.toString()} />
			</div>
		</div>
	);
}