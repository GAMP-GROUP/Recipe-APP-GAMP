'use client';
import React, {useState} from 'react';
import SelectList from './SelectList';

export default function FilterForm(props: {
    dataIngredients: string[],
    types: string[],
    categories: string[],
}) {
	const [recypeType, setRecypeType] = useState('');
	const [cateogory, setCategory] = useState('');
	const [ingredient, setIngredient] = useState('');
	const {dataIngredients, types, categories} = props;

	function chekcIng(ingredient: string) {
		const validIngredient = dataIngredients.some((each) => each == ingredient);

		if (!validIngredient) {
			window.alert('Sorry, we don\'t have any recipes with that ingredient!');
			return;
		}

		setIngredient(ingredient);
	}

	function dispatchSearch() {
		const payload = {
			recipe_type: recypeType,
			cateogory,
			ingredient,
		};

		console.log(payload);
	}

	return (
		<section>
			<h1>Filter Form</h1>
			<SelectList options={types} label='recipe type' writeState={setRecypeType}/>
			<SelectList options={categories} label='category' writeState={setCategory} />
			<div>
				<label htmlFor="select-ingredients">Ingredient</label>
				<input list="ingredients" id="select-ingredients" onBlur={e => chekcIng(e.target.value)} />
				<datalist id="ingredients">
					{dataIngredients.map((each, index) => {
						return (
							<option
								value={each}
								key={each + index}
							/>
						);
					})}
				</datalist>
			</div>
			<button
				onClick={dispatchSearch}
			>
                Search
			</button>
		</section>
	);
}