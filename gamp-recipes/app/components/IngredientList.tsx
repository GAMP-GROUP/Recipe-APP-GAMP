'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import React from 'react';

type IngredientList = {
	ingredients: string[];
};

export default function IngredientList({ ingredients }: IngredientList) {
	const [itemsChecked, setItemsChecked] = useState<{ [key: string]: boolean }>(
		{}
	);

	const handleCheckboxClick = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		setItemsChecked({
			...itemsChecked,
			[name]: checked,
		});
	};

	useEffect(() => {
		const ingredientsLocal: string | null =
			localStorage.getItem('ingredientList');
		if (ingredientsLocal) {
			setItemsChecked(JSON.parse(ingredientsLocal));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('ingredientList', JSON.stringify(itemsChecked));
	}, [itemsChecked]);

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
							<div className='flex justify-between w-full gap-8 h-12'>
								{svgOptions[itemsChecked[property] ? 'option1' : 'option2']}
								<span>{property}</span>
							</div>
						</label>
					</li>
				))}
			</ul>
		</div>
	);
}
