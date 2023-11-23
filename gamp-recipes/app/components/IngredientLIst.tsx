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




	function localStorageData(id: string, ingredients: string[], itemsChecked: { [key: string]: boolean }) {
		const localStorageKey = `ingredients recipe ${id}`;
		const items = localStorage.getItem(localStorageKey);
		console.log('30', items);
		console.log('checked', itemsChecked);



		if (!items) {
			// Se o item não existir ou for null, inicialize com um objeto padrão
			const data = Object.fromEntries(ingredients.map(ingredient => [ingredient, false]));
			console.log('33', data);

			localStorage.setItem(localStorageKey, JSON.stringify(data));
			return data;
		} else {
			// Se o item existir, parse para objeto
			const ing = JSON.parse(items);
			console.log('40', ing);

			const data = Object.fromEntries(ingredients.map(ingredient => [ingredient, itemsChecked[ingredient] || false]));
			localStorage.setItem(localStorageKey, JSON.stringify(data));

		}
	}



	const handleCheckboxClick = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		setItemsChecked((prev) => ({ ...prev, [name]: checked }));
	};

	useEffect(() => {
		localStorageData(id.toString(), ingredients, itemsChecked);
	}, [id, ingredients, itemsChecked]);



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
