import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Ingredients } from '@prisma/client';
import { IngredientStatusOptions } from './CreateRecipeForm';

type TIngredientsFormProps = {
	allIngredientsList: Ingredients[],
	removeIngredient: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void,
	updateIngredientId: (ingredientName: string, ingredientIndex: number) => void,
	handleIngredientInput: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void,
	handleIngredientStatus: (ingredientName: string, ingredientAmount: string, ingredientIndex: number) => void,
	ingredientIndex: number,
	ingredientName: string,
	ingredientAmount: string,
	ingredientStatus: IngredientStatusOptions
}

export default function IngredientsForm({
	allIngredientsList,
	updateIngredientId,
	removeIngredient,
	handleIngredientInput,
	handleIngredientStatus,
	ingredientIndex,
	ingredientName,
	ingredientAmount,
	ingredientStatus
}: TIngredientsFormProps) {
	const [newIngredient, setNewIngredient] = useState(true);

	function checkIngredientStatus() {
		if (ingredientStatus === IngredientStatusOptions.Completed) {
			return 'bg-lime-400';
		} else if (ingredientStatus === IngredientStatusOptions.Failed) {
			return 'bg-rose-400';
		} else if (ingredientStatus === IngredientStatusOptions.Empty) {
			return '';
		}
	}

	function ingredientOnBlur() {
		updateIngredientId(ingredientName, ingredientIndex);
		handleIngredientStatus(ingredientName, ingredientAmount, ingredientIndex);
		checkIngredientStatus();
	}

	function deleteButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
		removeIngredient(event, ingredientIndex);
	}

	useEffect(() => {
		setNewIngredient(false);
	}, []);
	
	return (
		<section
			className={ `relative py-2 px-4 mb-6 rounded-3xl ${ checkIngredientStatus() } transition-opacity duration-500 ${ ingredientIndex === 0 ? '' : newIngredient ? 'opacity-0' : 'opacity-100' } shadow-md` }
		>
			{ /* Escolha do ingrediente */}
			<fieldset
				className='flex flex-row items-center'
			>
				<label
					htmlFor='name'
					className='py-2 mr-2 font-bold'
				>
					Ingredient:
				</label>
				<input
					id='name'
					type='text'
					list='ingredients'
					placeholder='butter'
					value={ ingredientName }
					onBlur={ () => ingredientOnBlur() }
					onChange={ (event) => handleIngredientInput(event, ingredientIndex) }
					className={ `${checkIngredientStatus()}` }
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
					onBlur={ () => ingredientOnBlur() }
					onChange={ (event) => handleIngredientInput(event, ingredientIndex) }
					className={ `${checkIngredientStatus()}` }
					required
				/>
			</fieldset>

			{ /* Botão para excluir o ingrediente */ }
			<button
				className='p-2 bg-red text-white rounded-full absolute top-4 right-4'
				onClick={ (event) => deleteButtonClick(event) }
			>
				<Image
					src={'/icons/delete.png'}
					width={ 20 }
					height={ 20 }
					alt='Delete icon button'
					className='invert'
				/>
			</button>
		</section>
	);
}
