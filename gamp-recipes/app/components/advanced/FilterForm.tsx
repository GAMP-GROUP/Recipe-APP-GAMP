'use client';
import React, {useState} from 'react';
import SelectList from './SelectList';
import DataInput from './DataInput';

export default function FilterForm(props: {
    dataIngredients: string[],
    types: string[],
    categories: string[],
}) {
	const [recipeType, setRecipeType] = useState<string[]>([]);
	const [category, setCategory] = useState<string[]>([]);
	const [ingredient, setIngredient] = useState('');
	const [alert, setAlert] = useState(false);
	const {dataIngredients, types, categories} = props;

	function handleSetter(
		writable: string,
		type: string,
	) {
		const setterId =  type === 'category';
		const reader = setterId ? category : recipeType;
		const setter = setterId ? setCategory : setRecipeType;
		
		if (reader.some((e => e === writable))) {
			const payload = reader.filter(e => e != writable);
			setter(payload);
			return; 
		}
			
		const payload = [...reader, writable];
		setter(payload);
	
	}

	function checkIng(ingredient: string) {
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
			recipe_type: recipeType,
			categories: category,
			ingredient,
		};

		console.log(payload);
	}

	return (
		<section>
			<h1>Filter Form</h1>
			<SelectList options={types} label='recipe type' writeState={handleSetter}/>
			<SelectList options={categories} label='category' writeState={handleSetter} />	
			{	alert 
				?
				<div role="alert"
					onClick={() => setAlert(false)}
				>
					<div className="bg-red-500 text-black font-bold rounded-t px-4 py-2">
						<p>Click here to dismiss</p>
					</div>
					<div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
						<p>Ingredient Not Found!</p>
						<p>Sorry, we dont have any recipes with that ingredient!</p>
					</div>
				</div>
				:
				<DataInput dataList={dataIngredients} checkIng={checkIng}/>
			}
			<button
				className='text-lg font-bold px-5 py-1 mr-2 mt-4 bg-black text-white rounded-2xl'
				onClick={dispatchSearch}
			>
                Search
			</button>
		</section>
	);
}