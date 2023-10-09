'use client';
import React, { useState } from 'react';
// import prisma from '@/prisma/client';
import IngredientSelect from '../components/IngredientSelect';

export default async function Create() {
	const [ingredientSelection, setIngredientSelection] = useState(false);
	// const [ingredientsList, setIngredientsList] = useState([]);

	// function selectNewIngredient() {
	// 	return (
	// 		<fieldset className='py-2'>
	// 			<label htmlFor='ingredient-1' className='mr-2'>Ingredient 1:</label>
	// 			<IngredientSelect />
	// 		</fieldset>
	// 	);
	// }

	function handleIngredientSelectButton() {
		setIngredientSelection(true);
	}

	return (
		<section className='flex-row justify-center items-center h-[600px]'>
			<h1 className='text-center font-extrabold text-lg mt-4'>New Recipe</h1>
			<form id='create-recipe' className='create-form mx-auto'>
				<fieldset className='py-2'>
					<label htmlFor='recipe-name' className='mr-2'>Recipe Name:</label>
					<input 
						id='recipe-name'
						type='text'
						placeholder='Lasagna al ragú'
						required
					/>
				</fieldset>
				<fieldset className='py-2'>
					<label htmlFor='recipe-type' className='mr-2'>Recipe Type:</label>
					<select name='recipe-type' id='recipe-type'>
						<option value='1'>Meal</option>
						<option value='2'>Drink</option>
					</select>
				</fieldset>
				<fieldset className='py-2'>
					<label htmlFor='recipe-image' className='mr-2'>Image:</label>
					<input type='text' name='recipe-image' id='recipe-image' />
				</fieldset>
				<fieldset className='py-2'>
					<label htmlFor='recipe-name' className='mr-2'>Instructions:</label>
					<textarea 
						id='instructions'
						placeholder='Start by chopping 1 onion...'
						className='border border-b-2 p-2'
						required
						cols={30}
						rows={4}
					/>
				</fieldset>
				<fieldset className='py-2'>
					<legend>Ingredient 1</legend>
					<button
						onClick={ () => handleIngredientSelectButton() }
						className='text-sm font-semibold px-5 py-1 mr-2 bg-black text-white rounded-2xl'
					>Select ingredient</button>
					{ ingredientSelection
						? <IngredientSelect />
						: ''
					}
				</fieldset>
			</form>
		</section>
	);
}
