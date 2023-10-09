'use client';
import React from 'react';

export default function IngredientSelect() {
	// const [inputValue, setInputValue] = useState('');
	// const [suggestions, setSuggestions] = useState([]);

	return (
		<>
			<fieldset className='bg-black text-white w-screen h-80 absolute top-10'>
				<input
					type='text'
					placeholder='Search for an ingredient'
				/>
				<ul>
					<li>sugestão de ingrediente 1</li>
				</ul>
			</fieldset>
		</>
	);
}
