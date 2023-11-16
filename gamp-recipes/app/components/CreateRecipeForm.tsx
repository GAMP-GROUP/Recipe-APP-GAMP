'use client';
import { recipePost } from '@/types';
import React, { useState } from 'react';
import IngredientsForm from './IngredientForm';
import { Ingredients } from '@prisma/client';

type TCreateRecipeFormProps = {
	allIngredientsList: Ingredients[],
	categoryList: { id: number, name: string }[]
}

export default function CreateRecipeForm({ allIngredientsList, categoryList }: TCreateRecipeFormProps) {
	const [payload, setPayload] = useState({
		tags: '',
		image: '',
		instructions: '',
		category: '1',
		recipe_name: '',
		recipe_type_id: '1',
	});
	const [recipeIngredients, setRecipeIngredients] = useState([{ name: '', amount: '', id: '' }]);

	// function handleIngredient(event: React.ChangeEvent<HTMLInputElement>) {
	// 	// console.log(event.target.id);

	// 	// função responsável por capturar os inputs do nome e quant de ingredientes
	// 	// cada dupla de input está indexada pelo nome e mantém essa relação no array ingredients na linha 11
	// 	const eventId: string = event.target.id;
	// 	const eventValue: string = event.target.value.toLowerCase();

	// 	const currentRecipeIngredients = [...recipeIngredients];

	// 	if (eventId === 'add-ingredient') {
	// 		const findIngredient = allIngredientsList.find((ingredient) => ingredient.ingredients_name === eventValue);
	// 		if (findIngredient) {
	// 			// const updateRecipeIngredients = [...currentRecipeIngredients, { name: findIngredient.ingredients_name, amount: '', id: findIngredient.id.toString() }];
	// 			// setRecipeIngredients(updateRecipeIngredients);
	// 		}
	// 	}
	// 	// const num = Number(index);
	// 	// newIngredients[num] = field === 'add-ingredient' 
	// 	// 	? { name: value.toLowerCase(), amount: newIngredients[num].amount, pk: isNaN(Number(pkOrString)) ? '' : pkOrString }
	// 	// 	: { pk: newIngredients[num].pk, name: newIngredients[num].name, amount: value };
	// 	// setIngredients(newIngredients);
		
	// }

	function addIngredient(event: React.MouseEvent<HTMLButtonElement>) {
		// responsável por adicionar no array ingredients do estado uma chava vazia para capturar inputs do usuário
		// referente ao nome e quantidade do ingrediente
		event.preventDefault();
		const adding = [...recipeIngredients, { name: '', amount: '', id: '' }];
		setRecipeIngredients(adding);
	}

	// function removeIngredient(event: React.MouseEvent<HTMLButtonElement>) {}

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

		setPayload({ ...payload, ...newPayload });
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

		recipeIngredients.forEach(({ name, amount, id: pk }) => {
			body.ingredients.push({ ingredient_name: name, pk: Number(pk) });
			body.amount.push(amount || null);
		});

		// const postBody = fetch('/localhost:3000/api/recipe/', { method: 'POST', body: JSON.stringify(body) });
	}

	return (
		<form
			id='create-recipe'
			className='create-form mx-auto items-center'
			onSubmit={postRecipe}
		>
			<section
				className='py-2 px-4 rounded-3xl border-solid border-[6px] border-white shadow-md'
			>
				{/* Nome da receita */}
				<fieldset className='py-2 flex flex-row items-center'>
					<label htmlFor='recipe_name' className='mr-2 font-bold'>Name:</label>
					<input
						id='recipe_name'
						type='text'
						// placeholder='Lasagna al ragú'
						className='border border-1 rounded-xl p-1 grow'
						onChange={(e) => handleChange(e)}
						required
					/>
				</fieldset>

				{/* Escolha entre "meal" ou "drink" */}
				<fieldset className='py-2 flex flex-row items-center'>
					<label htmlFor='recipe_type_id' className='mr-2 font-bold'>Meal or drink:</label>
					<select
						name='recipe_type_id'
						id='recipe_type_id'
						className='bg-white grow'
						onChange={ (event) => handleChange(event) }
					>
						<option value='1'>meal</option>
						<option value='2'>drink</option>
					</select>
				</fieldset>

				{/* Categoria da receita */}
				<fieldset className='py-2 flex flex-row items-center'>
					<label htmlFor='category' className='mr-2 font-bold'>
					Category:
					</label>
					<select
						name="category"
						id="category"
						className='bg-white grow'
						onChange={ (event) => handleChange(event) }
					>
						{categoryList.map(({ id, name }) => {
							return (
								<option
									key={id}
									value={id}
								>
									{name}
								</option>
							);
						})}
					</select>
				</fieldset>

				{/* URL da imagem da receita */}
				<fieldset className='py-2 flex flex-row items-center'>
					<label htmlFor='image' className='mr-2 font-bold'>Image:</label>
					<input
						type='url'
						name='image'
						id='image'
						className='border border-1 rounded-xl p-1 grow'
						onChange={(event) => handleChange(event) }
					/>
				</fieldset>

				{/* Tags */}
				<fieldset className='py-2 flex flex-row items-center'>
					<label htmlFor='tags' className='mr-2 font-bold'>Tags:</label>
					<input
						type='text'
						name='tags'
						id='tags'
						className='border border-1 rounded-xl p-1 grow'
						onChange={ (event) => handleChange(event) }
					/>
				</fieldset>

				{/* Instruções */}
				<fieldset className='py-2 flex flex-col items-start'>
					<label htmlFor='instructions' className='py-2 mr-2 font-bold'>Instructions:</label>
					<textarea
						id='instructions'
						placeholder='Start by chopping 1 onion...'
						className='border border-1 rounded-xl p-2 grow'
						required
						cols={30}
						rows={4}
						onChange={(e) => handleChange(e)}
					/>
				</fieldset>
			</section>

			{ /* Escolha dos ingredientes */}
			<h1 className='text-center font-extrabold text-xl mt-4 mb-2'>Select Ingredients</h1>
			<fieldset>
				{ recipeIngredients.map((_ingredientAdded, index) => (
					<IngredientsForm
						key={ index }
						allIngredientsList={ allIngredientsList }
						recipeIngredients={ recipeIngredients }
					/>
				)) }
			</fieldset>

			{ /* Botão para adicionar mais ingredientes */}
			<button
				onClick={(event) => addIngredient(event)}
				className='text-sm font-semibold py-1 mr-2 bg-yellow text-black rounded-2xl w-full'
			>
				New Ingredient
			</button>

			{ /* Botão para finalizar a receita */}
			<button
				className='text-lg font-bold px-5 py-1 mr-2 mt-4 bg-black text-white rounded-2xl create-button'
			>
				Finish
			</button>
		</form>
	);
}
