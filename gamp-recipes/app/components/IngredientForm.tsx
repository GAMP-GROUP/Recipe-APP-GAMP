import React, { useState } from 'react';
import { Ingredients } from '@prisma/client';

type TIngredientsFormProps = {
	allIngredientsList: Ingredients[],
	recipeIngredients: { name: string, amount: string, id?: string }[],
	recipeIngredientsIndex: number,
	removeIngredient: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void,
	updateIngredientId: (ingredientName: string, ingredientIndex: number) => void,
	handleIngredientInput: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void,
	ingredientName: string,
	ingredientAmount: string,
}

enum IngredientStatusOptions {
	Empty = 'empty',
	Failed = 'failed',
	Completed = 'completed'
}

export default function IngredientsForm({
	allIngredientsList,
	recipeIngredients,
	recipeIngredientsIndex,
	updateIngredientId,
	removeIngredient,
	handleIngredientInput,
	ingredientName,
	ingredientAmount
}: TIngredientsFormProps) {
	const [ingredientStatus, setIngredientStatus] = useState<IngredientStatusOptions>(IngredientStatusOptions.Empty);
	
	// Função responsável por controlar se ambos os campos do ingrediente foram preenchidos
	// se sim, coloca o estado "ingredientStatus" como true
	function handleIngredientStatus(): void {
		if (ingredientName.trim() !== '' && ingredientAmount.trim() !== '') {
			const status = updateIngredientId(ingredientName, recipeIngredientsIndex);
			if (typeof status === 'number') {
				setIngredientStatus(IngredientStatusOptions.Completed);
			} else {
				setIngredientStatus(IngredientStatusOptions.Failed);
			}
		} else {
			setIngredientStatus(IngredientStatusOptions.Empty);
		}
	}

	function checkIngredientStatus() {
		if (ingredientStatus === IngredientStatusOptions.Completed) {
			return 'bg-lime-400';
		} else if (ingredientStatus === IngredientStatusOptions.Failed) {
			return 'bg-rose-400';
		} else if (ingredientStatus === IngredientStatusOptions.Empty) {
			return '';
		}
	}

	function deleteButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
		if (recipeIngredientsIndex === 0
			&& (recipeIngredients[recipeIngredientsIndex].name === ''
			&& recipeIngredients[recipeIngredientsIndex].amount) === '') {
			setIngredientStatus(IngredientStatusOptions.Empty);
		}

		removeIngredient(event, recipeIngredientsIndex);
	}
	
	return (
		<section
			className={ `py-2 px-4 mb-6 rounded-3xl ${checkIngredientStatus()} shadow-md` }
		>
			{ /* Escolha do ingrediente */}
			<fieldset
				className='flex flex-row items-center'
			>
				<label
					htmlFor='name'
					className='mr-2 font-bold'
				>
					Ingredient:
				</label>
				<input
					id='name'
					type='text'
					list='ingredients'
					placeholder='butter'
					value={ ingredientName }
					onBlur={ () => handleIngredientStatus() }
					onChange={ (event) => handleIngredientInput(event, recipeIngredientsIndex) }
					className={ `my-2 ${checkIngredientStatus()}` }
					required
				>
				</input>
				<datalist
					id='ingredients'
				>
					{ allIngredientsList.map((ingredient) => (
						<option
							key={ingredient.id}
							value={ingredient.ingredients_name}
						/>
					)) }
				</datalist>
			</fieldset>

			{ /* Escolha da quantidade de ingrediente */}
			<fieldset
				className='flex flex-row items-center'
			>
				<label
					htmlFor='ingredient-amount'
					className='py-2 mr-2 font-bold'
				>
					Amount:
				</label>
				<input
					type='text'
					name='amount'
					id='amount'
					placeholder='1/2 cup'
					value={ ingredientAmount }
					onBlur={ () => handleIngredientStatus() }
					onChange={ (event) => handleIngredientInput(event, recipeIngredientsIndex) }
					className={ `my-2 ${checkIngredientStatus()}` }
					required
				/>
			</fieldset>
			<button
				// hidden={ recipeIngredientsIndex === 0 ? true : false }
				className='p-2 bg-red text-white rounded-2xl'
				onClick={ (event) => deleteButtonClick(event) }
			>
					Delete
			</button>
		</section>
	);
}
 