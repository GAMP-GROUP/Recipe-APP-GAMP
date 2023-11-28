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


	const initialItemsChecked = JSON.parse(localStorage.getItem('itemsChecked') ?? '') || {};
	const [itemsChecked, setItemsChecked] = useState(initialItemsChecked);
	const [count, setCount] = useState<number>(0);

	const [isDisabled, setIsDisabled] = useState<boolean>(true);



	const handleFinishBtn = () => {
		console.log(isDisabled);

		console.log('finish');
	};


	useEffect(() => {
		const ingredientsLocal: string | null =
			localStorage.getItem(`ingredients recipe ${id}`);
		if (ingredientsLocal) {
			setItemsChecked(JSON.parse(ingredientsLocal));

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
		const updatedCount = checked ? count + 1 : Math.max(count - 1, 0); // Ensure count is not negative
		console.log('updatedCount', updatedCount);

		if (updatedCount === ingredients.length) {
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
				className='h-8 w-8 text-green-500'
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
				className='h-6 w-6 text-yellow'
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
		<div className='flex-col  mr-3 '>
			<h2
				className='text-2xl text-left uppercase ml-3 font-lato font-semibold mb-5'
			>ingredients</h2>
			<section className='flex-col'>

				{ingredients.map((property, index) => (
					<motion.div
						animate={{
							backgroundColor: itemsChecked[property]
								? 'rgb(134, 239, 172)'
								: 'hsl(0, 0%, 100%)', // Branco para false
						}}


						className={`flex mb-3 flex-row justify-between shadow-lg rounded-xl h-fit  ml-3 mr-10 max-w-screen-sm ${itemsChecked[property] ? 'bg-green-300' : ''}`} key={index}>
						<ul
							className='self-center w-full '
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
										<p className='text-left ml-2 w-full text-xl text-gray-600 h-fit '>{amount[index]}  {property}</p>


									</div>

								</label>
							</li>
						</ul>
					</motion.div>
				))}




				<div className='self-end w-screen'>
					<button
						type="button"
						disabled={isDisabled}
						onClick={handleFinishBtn}
						className={`  text-white bg-gray-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex  ${isDisabled ? 'bg-gray-300' : 'bg-gray-800'}`}
					>
						Finish
					</button>
				</div>


			</section>

		</div >
	);
}
