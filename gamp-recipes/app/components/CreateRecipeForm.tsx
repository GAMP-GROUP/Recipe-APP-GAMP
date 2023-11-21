'use client';
import { recipePost } from '@/types';
import React, { useState } from 'react';
import IngredientsForm from './IngredientForm';
import { Ingredients } from '@prisma/client';

type TCreateRecipeFormProps = {
	allIngredientsList: Ingredients[],
	categoryList: { id: number, name: string }[]
}

export enum IngredientStatusOptions {
	Empty = 'empty',
	Failed = 'failed',
	Completed = 'completed'
}

type TRecipeIngredient = {
	name: string,
	amount: string,
	id?: string,
	status: IngredientStatusOptions,
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
	const [recipeIngredients, setRecipeIngredients] = useState<TRecipeIngredient[]>([{ name: '', amount: '', status: IngredientStatusOptions.Empty }]);

	function addIngredient(event: React.MouseEvent<HTMLButtonElement>): void {
		// Responsável por adicionar no array ingredients do estado uma chava vazia para capturar inputs do usuário
		// referente ao nome e quantidade do ingrediente
		event.preventDefault();
		const updateIngredients = [...recipeIngredients, { name: '', amount: '', id: '', status: IngredientStatusOptions.Empty }];
		setRecipeIngredients(updateIngredients);
	}
	function handleIngredientInput(event: React.ChangeEvent<HTMLInputElement>, ingredientIndex: number) {
		// Essa função muda o valor dos estados "ingredientName" e "ingredientAmount"
		// de acordo com a digitação do usuário
		const value = event.target.value;
		const id = event.target.id;
		const updateIngredients = [...recipeIngredients];
		
		if (id === 'name') {
			// handleIngredientInput(value, recipeIngredients[recipeIngredientsIndex].amount, Number(recipeIngredients[recipeIngredientsIndex].id));
			updateIngredients[ingredientIndex] = { name: value, amount: updateIngredients[ingredientIndex].amount, status: updateIngredients[ingredientIndex].status };
			setRecipeIngredients(updateIngredients);
		} else if (id === 'amount') {
			updateIngredients[ingredientIndex] = { name: updateIngredients[ingredientIndex].name, amount: value, status: updateIngredients[ingredientIndex].status };
			setRecipeIngredients(updateIngredients);
		}
	}

	function handleIngredientStatus(ingredientName: string, ingredientAmount: string, ingredientIndex: number): void {
		// Função responsável por controlar se ambos os campos do ingrediente foram preenchidos
		// se sim, coloca o estado "ingredientStatus" como true
		setRecipeIngredients(prevIngredients => {
			const updatedIngredients = [...prevIngredients];
	
			switch (true) {
			case updatedIngredients[ingredientIndex].id && ingredientAmount.trim() !== '':
				updatedIngredients[ingredientIndex].status = IngredientStatusOptions.Completed;
				break;
			case !updatedIngredients[ingredientIndex].id:
				updatedIngredients[ingredientIndex].status = IngredientStatusOptions.Failed;
				break;
			case ingredientName === '' || ingredientAmount === '':
				updatedIngredients[ingredientIndex].status = IngredientStatusOptions.Empty;
				break;
			default:
				break;
			}
	
			return updatedIngredients;
		});
	}  

	function updateIngredientId(ingredientName: string, ingredientIndex: number): null | number {
		// Função que incrementa ao objeto do ingrediente sua ID respectiva,
		// a partir da lista de todos os ingredientes disponíveis para cadastro de receita
		const findIngredient = allIngredientsList.find((ingredient) => (
			ingredient.ingredients_name === ingredientName
		));

		if (!findIngredient) {
			console.log('Ingrediente não encontrado');
			return null;
		}

		const updateIngredients = [...recipeIngredients];
		updateIngredients[ingredientIndex] = {
			...updateIngredients[ingredientIndex],
			id: findIngredient.id.toString()
		};
		setRecipeIngredients(updateIngredients);

		return findIngredient.id;
	}

	function removeIngredient(event: React.MouseEvent<HTMLButtonElement>, index: number): void {
		// Função para remover um ingrediente da lista
		event.preventDefault();

		if (index === 0 && recipeIngredients.length === 1) {
			setRecipeIngredients([{ name: '', amount: '', id: '', status: IngredientStatusOptions.Empty }]);
		} else {
			const updateIngredients = [...recipeIngredients];
			updateIngredients.splice(index, 1);
			setRecipeIngredients(updateIngredients);
		}

	}

	function handleChange(
		event:
			React.ChangeEvent<HTMLTextAreaElement>
			| React.ChangeEvent<HTMLSelectElement>
			| React.ChangeEvent<HTMLInputElement>
	): void {
		// função handleChange genérica para registro dos inputs do form

		const userInput = event.currentTarget.value;
		const field = event.target.id;
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
						placeholder='Traditional Cheesburguer'
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
			<h1 className='text-center font-extrabold text-xl my-6'>Select Ingredients</h1>
			<fieldset>
				{ recipeIngredients.map((_ingredientAdded, index) => (
					<IngredientsForm
						key={ index }
						allIngredientsList={ allIngredientsList }
						removeIngredient={ removeIngredient }
						updateIngredientId={ updateIngredientId }
						handleIngredientInput={ handleIngredientInput }
						handleIngredientStatus={ handleIngredientStatus }
						ingredientIndex={ index }
						ingredientName={ recipeIngredients[index].name }
						ingredientAmount={ recipeIngredients[index].amount }
						ingredientStatus={ recipeIngredients[index].status }
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
