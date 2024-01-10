'use client';
import React, {useState} from 'react';
import SelectList from './SelectList';

export default function FilterForm(props: {
    dataIngredients: string[],
    types: string[],
    categories: string[],
}) {
	const [recypeType, setRecypeType] = useState('');
	const [category, setCategory] = useState<string[]>([]);
	const [ingredient, setIngredient] = useState('');
	const [alert, setAlert] = useState(false);
	const {dataIngredients, types, categories} = props;

	function handleSetter(
		writable: string,
		type: string,
	) {
		const setterId =  type === 'category';
		
		if (setterId) {
			if (category.some((e => e === writable))) {
				const categories = category.filter(e => e != writable);
				setCategory(categories);
				return; 
			}
			
			const categories = [...category, writable];
			setCategory(categories);
			return;
		}

		setRecypeType(writable);
	}

	function chekcIng(ingredient: string) {
		const validIngredient = dataIngredients
			.some((each) => each == ingredient);

		if (!validIngredient) {
			setAlert(true);
			return;
		}

		setIngredient(ingredient);
	}

	function dispatchSearch() {
		const payload = {
			recipe_type: recypeType,
			category,
			ingredient,
		};

		console.log(payload);
	}

	return (
		<section>
			<h1>Filter Form</h1>
			<SelectList options={types} label='recipe type' writeState={handleSetter}/>
			<SelectList options={categories} label='category' writeState={handleSetter} />
			<div>
				<label htmlFor="select-ingredients">Ingredient</label>
				<input list="ingredients" id="select-ingredients" onBlur={e => chekcIng(e.target.value)} />
				
				{	alert 
					?
					<div role="alert"
						onClick={() => setAlert(false)}
					>
						<div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
						Ingredient Not Found!
						</div>
						<div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
							<p>`Sorry, we dont have any recipes with that ingredient!`</p>
						</div>
					</div>
					:
					null
				}
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
				className='text-lg font-bold px-5 py-1 mr-2 mt-4 bg-black text-white rounded-2xl'
				onClick={dispatchSearch}
			>
                Search
			</button>
		</section>
	);
}