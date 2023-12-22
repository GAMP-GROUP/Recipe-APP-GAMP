'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { finishRecipe } from '../lib/recipeApi';
import { useSession } from 'next-auth/react';

type ingredientListProps = {
	id: number;
	ingredients: string[];
	amount: string[] | [];
};

export default function IngredientList({ ingredients, id, amount }: ingredientListProps) {

	const session = useSession();

	if (localStorage.getItem(`ingredients recipe ${id}`) === null ||!localStorage.getItem(`ingredients recipe ${id}`)) {
		localStorage.setItem(`ingredients recipe ${id}`, JSON.stringify({}));
	}

	const [itemsChecked, setItemsChecked] = useState<Record<string, boolean>>({});

	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const handleFinishBtn = async () => {

		if (session.status === 'unauthenticated') {
			window.alert('You need to sign in or register in GAMP in order to finish recipes');
			return;
		}
		const recipe = await finishRecipe(id.toString());

		if (recipe) {
			window.alert('Recipe finished!');
			setItemsChecked({});
			localStorage.setItem(`ingredients recipe ${id}`, JSON.stringify({}));
			console.log('recipe', recipe);
			
			return recipe;

		}

		

		return recipe;

	};

	const allItemsAreChecked = (itemsChecked: Record<string, boolean>) => {
		return Object.values(itemsChecked).every((item) => item === true);

	};

	useEffect(() => {
		const ingredientsLocal: string | null =
			localStorage.getItem(`ingredients recipe ${id}`);
		(isDisabled);
			
		if (ingredientsLocal) {
			setItemsChecked(JSON.parse(ingredientsLocal));
			allItemsAreChecked(JSON.parse(ingredientsLocal)) ? setIsDisabled(false) : setIsDisabled(true);

			if (JSON.parse(ingredientsLocal).length === ingredients.length && allItemsAreChecked(JSON.parse(ingredientsLocal))) {
				setIsDisabled(false);
			}

			if(Object.values(itemsChecked).length === 0) {
				setIsDisabled(true);
			}

			if(allItemsAreChecked(JSON.parse(ingredientsLocal)) && Object.values(JSON.parse(ingredientsLocal)).length === ingredients.length) {
				setIsDisabled(false);

			}

		}

	}, []);

	useEffect(() => {
		localStorage.setItem(`ingredients recipe ${id}`, JSON.stringify(itemsChecked));

	}, [itemsChecked]);


	/**
 * Manipula o clique nos checkboxes dos ingredientes. Atualiza o estado dos itens marcados,
 * contabiliza o número atual de itens marcados, e verifica se todos os itens foram marcados
 * para habilitar ou desabilitar o botão de conclusão. Também verifica se há um estado anterior
 * dos itens marcados armazenado localmente e ajusta a contagem com base nisso.
 */
	const handleCheckboxClick = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;

		// Obtém o estado atual dos itens marcados do localStorage
		const itemsAlreadyInLocalStorage = Object.values(itemsChecked) as boolean[];

		// Conta inicial de itens marcados antes da atualização
		const initialCount = Object.values(itemsAlreadyInLocalStorage).filter(item => item).length;

		// Atualiza o estado dos itens marcados
		setItemsChecked(prev => ({
			...prev,
			[name]: checked,
		}));

		// Contagem atualizada após a atualização do estado
		let updatedCount = initialCount + (checked ? 1 : -1);

		// Verifica se todos os itens foram marcados para habilitar o botão
		if (updatedCount === ingredients.length || updatedCount > ingredients.length) {
			updatedCount = ingredients.length;
			setIsDisabled(false);
		}
		// Verifica se há um estado anterior dos itens marcados armazenado localmente
		const ingredientsLocal: string | null = localStorage.getItem(`ingredients recipe ${id}`);

		// Se houver um estado local anterior e todos os itens estiverem marcados, habilita o botão
		if (ingredientsLocal) {
			if (
				JSON.parse(ingredientsLocal).length === ingredients.length && 
				allItemsAreChecked(JSON.parse(ingredientsLocal))
			) {
				setIsDisabled(false);
			}
		}
		// Desabilita o botão se a contagem de itens marcados não for igual ao total de ingredientes
		setIsDisabled(updatedCount !== ingredients.length);
	};

	const svgOptions = {
		option1: (
			<svg
				className='h-8 w-8 text-green-500 mt-2'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				{' '}
				<polyline points='20 6 9 17 4 12' />
			</svg>
		),
		option2: (
			<svg
				className='h-6 w-6 text-yellow mt-2'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				{' '}
				<circle cx='12' cy='12' r='10' />
			</svg>
		),
	};

	return (
		<div className='flex-col gap-3 min-w-[358px] w-full flex mr-3 mt-3'>

			<h2
				className='text-xl text-left ml-3 text-gray-700 font-lato font-semibold xl:border-yellow xl:border-solid border-b-4 w-fit h-fit'
			>Ingredients</h2>

			<section className=' w-fit overflow-y-auto scrollbar-thumb-slate-400 hover:scrollbar-thumb-slate-700 max-h-96 scrollbar-thin scrollbar-track-slate-100 xl:h-fit xl:max-h-80'>

				{ingredients.map((property, index) => (
					<motion.div

						animate={{
							backgroundColor: itemsChecked[property]
								? 'rgb(134, 239, 172)'
								: 'hsl(0, 0%, 100%)', // Branco para false
						}}

						className={`flex mb-3 flex-row justify-between shadow-md xl:min-w-[171px] items-center max-h-11 rounded-md  h-fit xl:max-w-sm xl:h-10 ml-3 mr-10 ${itemsChecked[property] ? 'bg-green-300' : ''}`} key={index}>
						<ul
							className='self-center w-full xl:mt-2 xl:h-fit '
						>
							<li>

								<label>

									<input
										type='checkbox'
										name={property}
										checked={itemsChecked[property] || false}
										onChange={handleCheckboxClick}
										className='hidden w-full'
									/>

									<div className='flex row items-center justify-around mb-2 ml-2 h-12 '>

										{svgOptions[itemsChecked[property] ? 'option1' : 'option2']}
										<p className='text-left ml-2 w-full text-xl mt-2 xl:text-xs font-semibold text-gray-600 h-fit '>{amount[index]} {property}</p>

									</div>

								</label>

							</li>

						</ul>

					</motion.div>
				))}

			</section>

			<div className='flex justify-center xl:justify-start xl:ml-4 mt-8 items-center'>
				<motion.button
					onClick={handleFinishBtn}
					disabled={isDisabled}
					animate={{
						backgroundColor: isDisabled
							? 'rgb(229 231 235)'
							: 'rgb(0, 0, 0)',

					}}
					transition={{ duration: 0.5 }}
					className={
						`${isDisabled ? '' : 'text-white'} xl:w-[163px] text-gray-800 font-bold justify-center w-2/3 h-2/3 p-2 text-lg rounded inline-flex items-center`}>
					
					Finish Recipe
				</motion.button>

			</div>

		</div >
	);
}
