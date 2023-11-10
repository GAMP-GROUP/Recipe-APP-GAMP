'use client';
import { recipePost } from '@/types';
import React, { useState } from 'react';
import IngredientsForm from './IngredientForm';
import { Ingredients } from '@prisma/client';

type TCreateRecipeFormProps = {
	ingredientsList: Ingredients[],
	categoryList: { id: number, name: string }[]
}

export default function CreateRecipeForm({ ingredientsList, categoryList}: TCreateRecipeFormProps) {
	const [payload, setPayload] = useState({
		tags: '',
		image: '',
		instructions: '',
		category: '1',
		recipe_name: '',
		recipe_type_id: '1', 
	});
	const [ingredients, setIngredients] = useState([{ name: '', amount: '', id: ''}]);

	function handleIngredient(event: React.ChangeEvent<HTMLInputElement>) {
		// console.log(event.target.id);

		// função responsável por capturar os inputs do nome e quant de ingredientes
		// cada dupla de input está indexada pelo nome e mantém essa relação no array ingredients na linha 11
		const eventId: string = event.target.id;
		const eventValue: string = event.target.value.toLowerCase();

		const recipeIngredients = [...ingredients];

		if (eventId === 'add-ingredient') {
			const findIngredient = ingredientsList.find((ingredient) => ingredient.ingredients_name === eventValue);
			if (findIngredient) {
				console.log(findIngredient.ingredients_name, findIngredient.id);
			}
		}

		// const num = Number(index);
		// newIngredients[num] = field === 'add-ingredient' 
		// 	? { name: value.toLowerCase(), amount: newIngredients[num].amount, pk: isNaN(Number(pkOrString)) ? '' : pkOrString }
		// 	: { pk: newIngredients[num].pk, name: newIngredients[num].name, amount: value };
		// setIngredients(newIngredients);
	}

	function addIngredient(event: React.MouseEvent<HTMLButtonElement>) {
		// responsável por adicionar no array ingredients do estado uma chava vazia para capturar inputs do usuário
		// referente ao nome e quantidade do ingrediente
		event.preventDefault();
		const adding = [...ingredients, { name: '', amount: '', id: '' }];
		setIngredients(adding);
	}

	function handleChange(
		e: 
		React.ChangeEvent<HTMLTextAreaElement> 
		| React.ChangeEvent<HTMLSelectElement>
		| React.ChangeEvent<HTMLInputElement>
	) {
		// função handleChange genérica para registro dos inputs do form

		const userInput = e.currentTarget.value;
		const field = e.target.id;
		const newPayload = { [field]: userInput };

		setPayload({...payload, ...newPayload});
	}

	async function postRecipe(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const { tags, image, instructions, category, recipe_name, recipe_type_id } = payload;

		const body: recipePost = {
			recipe_type_id: Number(recipe_type_id),
			category: Number(category),
			recipe_name,
			instructions,
			image,
			tags,
			ingredients: [],
			amount: [],
		};

		ingredients.forEach(({name, amount, id: pk}) => {
			body.ingredients.push({ ingredient_name: name, pk: Number(pk)});
			body.amount.push(amount || null);
		});

		const postBody = fetch('/localhost:3000/api/recipe/', { method: 'POST', body: JSON.stringify(body) });
	}

	return (
		<form id='create-recipe' className='create-form mx-auto' 
			onSubmit={postRecipe}>
			{/* Recipe Name */}
			<fieldset className='py-2'>
				<label htmlFor='recipe_name' className='mr-2'>Recipe name:</label>
				<input 
					id='recipe_name'
					type='text'
					placeholder='Lasagna al ragú'
					className='border border-b-2 p-1'
					onChange={ (e) => handleChange(e) }
					required
				/>
			</fieldset>

			{/* Meal or drink */}
			<fieldset className='py-2'>
				<label htmlFor='recipe_type_id' className='mr-2'>Meal or drink:</label>
				<select name='recipe_type_id' id='recipe_type_id' onChange={(e) => handleChange(e)}>
					<option value='1'>meal</option>
					<option value='2'>drink</option>
				</select>
			</fieldset>

			{/* Recipe Category */}
			<fieldset className='py-2'>
				<label htmlFor='category' className='mr-2'>
					Category:
				</label>
				<select name="category" id="category" onChange={ (e) => handleChange(e) }>
					{	categoryList.map(({ id, name })=> {
						return (
							<option
								key={ id }
								value={ id }
							>
								{ name }
							</option>
						);
					})}
				</select>
			</fieldset>

			{/* Image */}
			<fieldset className='py-2'>
				<label htmlFor='image' className='mr-2'>Image:</label>
				<input type='text' name='image' id='image' className='border border-b-2 p-1' onChange={(e) => handleChange(e)}/>
			</fieldset>

			{/* Tags */}
			<fieldset className='py-2'>
				<label htmlFor='tags' className='mr-2'>Tags:</label>
				<input type='text' name='tags' id='tags' className='border border-b-2 p-1' onChange={(e) => handleChange(e)}/>
			</fieldset>

			{/* Instructions */}
			<fieldset className='py-1 flex flex-col'>
				<label htmlFor='instructions' className='py-2 mr-2'>Instructions:</label>
				<textarea 
					id='instructions'
					placeholder='Start by chopping 1 onion...'
					className='border border-b-2 p-2'
					required
					cols={30}
					rows={4}
					onChange={(e) => handleChange(e)}
				/>
			</fieldset>

			{ /* Escolha dos ingredients */ }
			<fieldset>
				<IngredientsForm
					ingredientsList={ ingredientsList }
					handleIngredient={ handleIngredient }
				/>
			</fieldset>
		
			{ /* Botão para adicionar mais ingredientes */ }
			<button
				onClick={ (event) => addIngredient(event) }
				className='text-md font-bold my-2 px-5 py-1 mr-2 bg-yellow text-black rounded-2xl w-1/2'
			>
				New Ingredient
			</button>
			
			{ /* Botão para finalizar a receita */ }
			<button
				type='submit'
				className='text-lg font-bold px-5 py-1 mr-2 bg-black text-white rounded-2xl create-button'>
					Create
			</button>
		</form>
	);
}
