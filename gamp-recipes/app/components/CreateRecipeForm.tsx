'use client';
import { Ingredients } from '@prisma/client';
import React from 'react';

type TCreateRecipeFormProps = {
    ingredientsList: Ingredients[]
}

export default function CreateRecipeForm({ ingredientsList }: TCreateRecipeFormProps) {
	return (
		<form id='create-recipe' className='create-form mx-auto'>
			<fieldset className='py-2'>
				<label htmlFor='recipe-name' className='mr-2'>Recipe Name:</label>
				<input 
					id='recipe-name'
					type='text'
					placeholder='Lasagna al ragú'
					className='border border-b-2 p-1'
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
				<input type='text' name='recipe-image' id='recipe-image' className='border border-b-2 p-1' />
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
				<label htmlFor='ingredient-1' className='mr-2'>Ingredient 1:</label>
				<select name='ingredient-1' id='ingredient-1'>
					{ ingredientsList.map((ingredient: Ingredients, index: number) => (
						<option
							key={ index }
							value={ ingredient.ingredients_name }
						>
							{ ingredient.ingredients_name }
						</option>
					))}
				</select>
			</fieldset>
			<button
				type='submit'
				className='text-lg font-bold px-5 py-1 mr-2 bg-black text-white rounded-2xl create-button'>
					Create
			</button>
		</form>
	);
}