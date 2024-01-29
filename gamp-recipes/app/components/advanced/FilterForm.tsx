'use client';
import React, {useState} from 'react';
import SelectList from './SelectList';
import DataInput from './DataInput';
import { AnimatePresence } from 'framer-motion';
import MotionNotFound from './MotionNotFound';

export default function FilterForm(props: {
    dataIngredients: string[],
    types: string[],
    categories: string[],
}) {
	const [recipeType, setRecipeType] = useState<string[]>([]);
	const [category, setCategory] = useState<string[]>([]);
	const [ingredient, setIngredient] = useState('');
	const [term, setTerm] = useState<string>('');
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
			recipe_name: term,
			ingredient,
		};

		console.log(payload);
	}

	return (
		<section
			className='flex flex-col items-center'
		>
			<h1>Filter component</h1>
			<SelectList options={types} label='recipe type' writeState={handleSetter} />
			<SelectList options={categories} label='category' writeState={handleSetter} />
			<div
				className='flex flex-col items-center my-2'
			>
				<label
					className='text-center'
					htmlFor='recipe-title'
				>Recipe Title</label>
				<input
					className='border-solid border-2 border-black rounded-lg'
					id='recipe-title'
					onChange={e => setTerm(e.target.value)}
					type="text"
				/>	
			</div>
			<div
				className='w-1/2 h-36'
			>
				<AnimatePresence>
					{	alert 
						?
						<MotionNotFound 
							setAlert={setAlert}
							message={'Ingredient not found! we dont have any recipes that use such ingredient'}
						/>
						:
						<DataInput 
							dataList={dataIngredients}
							dataType='ingredients'
							checkIng={checkIng}/>
					}
				</AnimatePresence>
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