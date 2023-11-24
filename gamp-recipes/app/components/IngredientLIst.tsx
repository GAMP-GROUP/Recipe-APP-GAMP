'use client';



import { ChangeEvent, useEffect, useState } from 'react';
import React from 'react';



type ingredientListProps = {
	id: number;
	ingredients: string[];
	amount: string[];


}



export default function IngredientList({ ingredients, id, amount }: ingredientListProps) {
	const [itemsChecked, setItemsChecked] = useState<{ [key: string]: boolean }>(
		{}
	);

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
		setItemsChecked((prev) => ({ ...prev, [name]: checked }));

		setCount((prevCount) => {
			// Incrementa se checked é true, decrementa se checked é false
			return checked ? prevCount + 1 : prevCount - 1;
		});

		// Este código será executado após o estado ser atualizado
		const updatedCount = checked ? count + 1 : count - 1;

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
		<div>
			<h2
				className='text-2xl text-center uppercase font-semibold mb-5'
			>ingredients</h2>

			{ingredients.map((property, index) => (
				<div className='flex flex-row justify-between' key={index}>
					<ul
						className=''
					>
						<li>
							<label>
								<input
									type='checkbox'
									name={property}
									checked={itemsChecked[property] || false}
									onChange={handleCheckboxClick}
									className='hidden'
								/>
								<div className='flex row w-full justify-around  h-12'>

									{svgOptions[itemsChecked[property] ? 'option1' : 'option2']}
									<span className='text-left ml-2'>{amount[index]}</span>
									<span className='text-left ml-2'>{property}</span>


								</div>

							</label>
						</li>
					</ul>
				</div>
			))}






			<div>

				<button type="button" disabled={isDisabled} onClick={handleFinishBtn} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Choose plan

				</button>
			</div>

		</div>
	);
}
