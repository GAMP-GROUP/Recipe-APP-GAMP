'use client';



import { ChangeEvent, useEffect, useState } from 'react';
import React from 'react';
import { motion } from 'framer-motion';



type ingredientListProps = {
	id: number;
	ingredients: string[];
	amount: string[];
};

export default function IngredientList({ ingredients, id, amount }: ingredientListProps) {


	if (localStorage.getItem(`ingredients recipe ${id}`) === null) {
		localStorage.setItem(`ingredients recipe ${id}`, JSON.stringify({}));
	}


	const [itemsChecked, setItemsChecked] = useState<Record<string, boolean>>({});
	const [count, setCount] = useState<number>(0);

	const [isDisabled, setIsDisabled] = useState<boolean>(true);



	const handleFinishBtn = () => {
		console.log(isDisabled);

		console.log('finish');
	};

	const allItemsAreChecked = (itemsChecked: Record<string, boolean>) => {
		return Object.values(itemsChecked).every((item) => item === true);

	};



	useEffect(() => {
		const ingredientsLocal: string | null =
			localStorage.getItem(`ingredients recipe ${id}`);
		if (ingredientsLocal) {
			setItemsChecked(JSON.parse(ingredientsLocal));
			console.log('49', JSON.parse(ingredientsLocal));
			allItemsAreChecked(JSON.parse(ingredientsLocal)) ? setIsDisabled(false) : setIsDisabled(true);
			console.log('allItemsAreChecked', allItemsAreChecked(JSON.parse(ingredientsLocal)));

		}

		if (ingredientsLocal?.length === ingredients.length) {
			setIsDisabled(false);

		}



	}, []);

	useEffect(() => {
		localStorage.setItem(`ingredients recipe ${id}`, JSON.stringify(itemsChecked));



	}, [itemsChecked]);


	const handleCheckboxClick = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;

		const itemsAlreadyInLocalStorage = Object.values(itemsChecked) as boolean[];

		const initialCount = Object.values(itemsAlreadyInLocalStorage).filter((item) => item).length;
		console.log('prevCount', initialCount);



		setItemsChecked((prev) => ({ ...prev, [name]: checked }));


		setCount((prevCount) => {
			// Incrementa se checked é true, decrementa se checked é false
			return checked ? initialCount + 1 : Math.max(prevCount - 1, 0); // Ensure count is not negative
		});

		// Este código será executado após o estado ser atualizado
		let updatedCount = checked ? count + 1 : Math.max(count - 1, 0); // Ensure count is not negative
		console.log('updatedCount', updatedCount);

		if (updatedCount === ingredients.length || updatedCount > ingredients.length) {
			updatedCount = ingredients.length;
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}




		console.log('count', updatedCount);
		console.log('ingredients.length', ingredients.length);
	};





	const svgOptions = {
		option1: (
			<svg
				className='h-8 w-8 text-green-500 mt-2'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				{' '}
				<polyline points='20 6 9 17 4 12' />
			</svg>
		),
		option2: (
			<svg
				className='h-6 w-6 text-yellow mt-2'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				{' '}
				<circle cx='12' cy='12' r='10' />
			</svg>
		),
	};



	return (
		<div className='flex-col gap-3 min-w-[358px] w-full flex lg:flex-col lg:flex  mr-3 '>

			<h2
				className='text-lg text-left ml-3 text-gray-700 font-lato font-semibold  h-fit'
			>Ingredients</h2>


			<section className=' w-fit overflow-y-auto scrollbar-thumb-slate-400 hover:scrollbar-thumb-slate-700 max-h-96 scrollbar-thin scrollbar-track-slate-100  lg:h-fit   lg:max-h-80'>



				{ingredients.map((property, index) => (
					<motion.div

						animate={{
							backgroundColor: itemsChecked[property]
								? 'rgb(134, 239, 172)'
								: 'hsl(0, 0%, 100%)', // Branco para false
						}}


						className={`  flex mb-3 flex-row justify-between shadow-lg lg:min-w-[171px] items-center max-h-11 lg:rounded-md rounded-xl h-fit lg:max-w-sm lg:h-10  ml-3 mr-10  ${itemsChecked[property] ? 'bg-green-300' : ''}`} key={index}>
						<ul
							className='self-center w-full lg:w-full lg:mt-2 lg:h-fit '
						>
							<li>
								<label>
									<input
										type='checkbox'
										name={property}
										checked={itemsChecked[property] || false}
										onChange={handleCheckboxClick}
										className='hidden w-full'
									/>
									<div className='flex row  items-center justify-around  mb-2 ml-2 h-12 '>

										{svgOptions[itemsChecked[property] ? 'option1' : 'option2']}
										<p className='text-left ml-2 w-full text-xl mt-2  lg:text-xs font-semibold text-gray-600 h-fit  '>{amount[index]}  {property}</p>


									</div>

								</label>
							</li>
						</ul>
					</motion.div>
				))}


			</section>

			<div className='flex justify-end items-center'>
				<button
					onClick={handleFinishBtn}
					disabled={isDisabled}
					className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold  justify-center  w-max p-2 text-sm rounded inline-flex items-center">

					<span>Finish Recipe</span>
				</button>


			</div>




		</div >
	);
}
