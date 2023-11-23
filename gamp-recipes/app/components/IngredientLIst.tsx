'use client';


import { ChangeEvent, useEffect, useState } from 'react';
import React from 'react';



type ingredientListProps = {
	id: number;
	ingredients: string[];


}



export default function IngredientList({ ingredients, id }: ingredientListProps) {
	const [itemsChecked, setItemsChecked] = useState<{ [key: string]: boolean }>(
		{}
	);

	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const handleDisabled = () => {
		const items = localStorage.getItem(`ingredients recipe ${id}`);
		const data = JSON.parse(items || '{}');
		const values = Object.values(data);
		const result = values.every((value) => value === !false);
		if (result) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
		console.log('27', result);


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
				className='text-2xl text-center uppercase'
			>ingredients</h2>
			<ul
				className=''
			>
				{ingredients.map((property) => (
					<li key={property}>
						<label>
							<input
								type='checkbox'
								name={property}
								checked={itemsChecked[property] || false}
								onChange={handleCheckboxClick}
								className='hidden'
							/>
							<div className='flex row w-full  h-12'>
								{svgOptions[itemsChecked[property] ? 'option1' : 'option2']}
								<span className='text-left ml-2'>{property}</span>
							</div>
						</label>
					</li>
				))}
			</ul>

			<div>
				<button type="button" onClick={() => console.log('está habilitado')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Choose plan

				</button>
			</div>
		</div>
	);
}
