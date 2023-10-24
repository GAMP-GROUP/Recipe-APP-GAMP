'use client';
import React, { useState } from 'react';

type TCreateRecipeFormProps = {
	ingredientList: string[]
}


export default function CreateRecipeForm({ ingredientList }: TCreateRecipeFormProps) {
	const [payload, setPayload] = useState({});
	const [ingredients, setIngredients] = useState([{ name: '', amount: '', pk: ''}]);

	function handleIngredient(e: React.ChangeEvent<HTMLInputElement>) {
		// função responsável por capturar os inputs do nome e quant de ingredientes
		// cada dupla de input está indexada pelo nome e mantém essa relação no array ingredients na linha 11
		const [field, index] = e.target.id.split('-');
		const value = e.target.value;
		let pkOrString = '';

		if (field === 'name') {
			const normalized = value.toLowerCase();
			pkOrString = ingredientList.includes(normalized) 
				? ingredientList.indexOf(normalized).toString() 
				: normalized;
		} 

		const newIngredients = [...ingredients];
		const num = Number(index);
		newIngredients[num] = field === 'name' 
			? { name: value, amount: newIngredients[num].amount, pk: isNaN(Number(pkOrString)) ? '' : pkOrString }
			: { pk: newIngredients[num].pk, name: newIngredients[num].name, amount: value };
		setIngredients(newIngredients);
	}

	function addIngredient(e: React.MouseEvent<HTMLButtonElement>) {
		// responsável por adicionar no array ingredients do estado uma chava vazia para capturar inputs do usuário
		// referente ao nome e quantidade do ingrediente
		e.preventDefault();
		const adding = [...ingredients, { name: '', amount: '', pk: '' }];
		setIngredients(adding);
	}

	function handleChange(
		e: 
		React.ChangeEvent<HTMLTextAreaElement> 
		| React.ChangeEvent<HTMLSelectElement>
		| React.ChangeEvent<HTMLInputElement>
	) {
		// função handleChange genérica para registro dos inputs do form
		e.preventDefault();

		const userInput = e.currentTarget.value;
		const field = e.target.id;
		const newPayload = { [field]: userInput };

		setPayload({...payload, ...newPayload});
	}

	return (
		<form id='create-recipe' className='create-form mx-auto'>
			<fieldset className='py-2'>
				<label htmlFor='recipeName' className='mr-2'>Recipe Name:</label>
				<input 
					id='recipeName'
					type='text'
					placeholder='Lasagna al ragú'
					className='border border-b-2 p-1'
					onChange={ (e) => handleChange(e) }
					required
				/>
			</fieldset>
			<fieldset className='py-2'>
				<label htmlFor='recipeType' className='mr-2'>Recipe Type:</label>
				<select name='recipeType' id='recipeType' onChange={(e) => handleChange(e)}>
					<option value='1'>Meal</option>
					<option value='2'>Drink</option>
				</select>
			</fieldset>
			<fieldset className='py-2'>
				<label htmlFor='recipeImage' className='mr-2'>Image:</label>
				<input type='text' name='recipeImage' id='recipeImage' className='border border-b-2 p-1' onChange={(e) => handleChange(e)}/>
			</fieldset>
			<fieldset className='py-2'>
				<label htmlFor='instructions' className='mr-2'>Instructions:</label>
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
			{
				ingredients.map((e, index) => {
					return (
						<fieldset
							key={`registerIng${index}`}
						>
							<label
								htmlFor={`name-${index.toString()}`}
							>
								Ingredient
								<input
									key={`name-${index.toString()}`}
									id={`name-${index.toString()}`}
									type='text'
									list='ingredients'
									placeholder='Butter'
									onBlur={ (e) => handleIngredient(e) }
									required
								/>
								<datalist
									id='ingredients'
								>
									{ 
										ingredientList.map((e, index) => {
											return (
												<option
													key={e + index}
													value={e}
												>
												</option>
											);
										})
									}
								</datalist>
							</label>
							<label
								htmlFor={`amount-${index.toString()}`}
							>
								Amount
								<input
									key={`amount-${index.toString()}`}
									id={`amount-${index.toString()}`}
									type='text'
									placeholder='1/2 cup'
									onBlur={ (e) => handleIngredient(e) }
								/>
							</label>
						</fieldset>
					);
				})
			}
			
			<button
				onClick={ (e) => addIngredient(e) }
				className='text-md font-bold px-5 py-1 mr-2 bg-yellow text-black rounded-2xl w-1/2'
			>
				Add Ingredient
			</button>
			<button
				type='submit'
				className='text-lg font-bold px-5 py-1 mr-2 bg-black text-white rounded-2xl create-button'>
					Create
			</button>
		</form>
	);
}