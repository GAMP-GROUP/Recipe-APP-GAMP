import React from 'react';
import { Ingredients } from '@prisma/client';

type TIngredientsFormProps = {
	allIngredientsList: Ingredients[],
	handleIngredient: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function IngredientsForm({ allIngredientsList, handleIngredient }: TIngredientsFormProps) {
	return (
		<section
			className='py-2'
		>
			{ /* Choose ingredient */}
			<fieldset
			>
				<label
					htmlFor='add-ingredient'
					className='mr-2'
				>
					Ingredient:
				</label>
				<input
					id='add-ingredient'
					type='text'
					list='ingredients'
					placeholder='butter'
					onBlur={(event) => handleIngredient(event)}
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

			{ /* Choose amount */}
			<fieldset>
				<label
					htmlFor='ingredient-amount'
					className='py-2 mr-2'
				>
					Amount:
				</label>
				<input
					type='text'
					name='ingredient-amount'
					id='ingredient-amount'
					placeholder='1/2 cup'
					onBlur={(event) => handleIngredient(event)}
				/>
			</fieldset>

			{/* <button>Save</button>
			<button>Delete</button> */}
		</section>
	);
}
