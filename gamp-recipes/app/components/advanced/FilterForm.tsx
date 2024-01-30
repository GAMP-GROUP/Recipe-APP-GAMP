'use client';
import React, {useState} from 'react';
import SelectList from './SelectList';
import DataInput from './DataInput';
import { AnimatePresence } from 'framer-motion';
import MotionNotFound from './MotionNotFound';
import { usePathname, useRouter } from 'next/navigation';
import LinkList from './LinkList';

export default function FilterForm(props: {
		areas: string[],
		dataIngredients: string[],
		types: string[],
		categories: string[],
}) {
	const [recipeType, setRecipeType] = useState<string[]>([]);
	const [category, setCategory] = useState<string[]>([]);
	const [ingredient, setIngredient] = useState('');
	const [browseBy, setBrowseBy] = useState(true);
	const [alert, setAlert] = useState(false);
	const {dataIngredients, types, categories, areas} = props;
	const path = usePathname();
	const router = useRouter();

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
		const cat = category.length <= 0 ? '' : category.join();
		const type = recipeType.length <= 0 ? '' : recipeType.join();
		const params = new URLSearchParams();
		params.set('category', cat);
		params.set('recipe_type', type);
		params.set('ingredient', ingredient);
		router.push(`${path}/filter?${params.toString()}`);
	}

	const inclusiveFilter = (
		<section
			className='flex flex-col items-center'
		>
			<SelectList options={types} label='recipe type' writeState={handleSetter} />
			<SelectList options={categories} label='category' writeState={handleSetter} />
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

	return (
		<section
			className='flex flex-col items-center'
		>	
			<h1>Filter component</h1>
			<button
				onClick={() => setBrowseBy(!browseBy)}
			>
				Click here to filter by {browseBy ? 'nationality' : 'categories'}
			</button>
			{ browseBy 
				? inclusiveFilter
				: <LinkList
					label='nationality'
					options={areas}
				/>
			}
		</section>
	);
}