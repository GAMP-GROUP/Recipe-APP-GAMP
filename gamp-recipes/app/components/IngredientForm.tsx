import React, { useState } from 'react';
import { Ingredients } from '@prisma/client';

type TIngredientsFormProps = {
	allIngredientsList: Ingredients[],
	recipeIngredients: { name: string, amount: string, id: string }[],
}

export default function IngredientsForm({ allIngredientsList, recipeIngredients }: TIngredientsFormProps) {
	const [ingredientStatus, setIngredientStatus] = useState(false);
	const [ingredientName, setIngredientName] = useState('');
	const [ingredientAmount, setIngredientAmount] = useState('');

	// Função responsável por controlar se ambos os campos do ingrediente foram preenchidos
	// se sim, coloca o estado "ingredientStatus" como true
	function handleIngredientStatus(event: React.ChangeEvent<HTMLInputElement>, nameOrAmount: string) {
		const value = event.target.value;

		if (nameOrAmount === 'name') {
			setIngredientStatus(value !== '' && ingredientAmount !== '');
		} else {
			setIngredientStatus(ingredientName !== '' && value !== '');
		}
	}

	// Essa função muda o valor dos estados "ingredientName" e "ingredientAmount"
	// de acordo com a digitação do usuário
	function handleIngredientChange(event: React.ChangeEvent<HTMLInputElement>, nameOrAmount: string) {
		const value = event.target.value;

		if (nameOrAmount === 'name') {
			setIngredientName(value);
		} else if (nameOrAmount === 'amount') {
			setIngredientAmount(value);
		}
	}
	
	return (
		<section
			className={ ingredientStatus === true ? 'py-2 px-4 mb-6 rounded-3xl bg-lime-400 shadow-md' : 'py-2 px-4 mt-2 mb-6 rounded-3xl border-solid border-[6px] border-white shadow-md' }
		>
			{ /* Escolha do ingrediente */}
			<fieldset
				className='flex flex-row items-center'
			>
				<label
					htmlFor='add-ingredient'
					className='mr-2 font-bold'
				>
					Ingredient:
				</label>
				<input
					id='add-ingredient'
					type='text'
					list='ingredients'
					placeholder='butter'
					value={ ingredientName }
					onBlur={ (event) => handleIngredientStatus(event, 'name') }
					onChange={ (event) => handleIngredientChange(event, 'name') }
					className='my-2'
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
					name='ingredient-amount'
					id='ingredient-amount'
					placeholder='1/2 cup'
					onBlur={ (event) => handleIngredientStatus(event, 'amount') }
					onChange={ (event) => handleIngredientChange(event, 'amount') }
					className='my-2'
					required
				/>
			</fieldset>
			{/* <section className='flex flex-row w-1/6'>
				<button className='bg-lime-400 px-2 py-1'>Save</button>
				<button className='bg-rose-400 px-2 py-1'>Delete</button>
			</section> */}
		</section>
	);
}
 