'use client';
import React from 'react';
import '../custom-styles.css';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import { useState } from 'react';
import Image from '@/node_modules/next/image';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
	const {
		setRecipeSearch
	} = useBehaviorContext();
	const [currentSearch, setCurrentSearch] = useState('');
	const router = useRouter();

	// Envia a pesquisa escrita no estado local para o provider,
	// chama a função para fechar a barra de pesquisa
	// e direciona para a página de pesquisa
	const handleSearch = () => {
		setRecipeSearch(currentSearch);
		router.push(`/search/${currentSearch}`);
	};

	// Recebe os eventos de click na lupa ou botão 'Enter' para disparar a pesquisa
	const handleSearchClick = (
		event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (('key' in event && event.key === 'Enter') || ('type' in event && event.type === 'click')) {
			handleSearch();
		}
	};

	return (
		<section
			// O container branco
			id='searchBar'
			className={`w-full pb-4
			xl:top-16 xl:w-96` }
		>
			<fieldset
				// Todo container que abrange o campo input mais o botão
				className='w-full bg-gray-200 rounded-xl py-2 self-center flex justify-between place-items-center'
			>
				<input
					// O campo para inserir o termo de pesquisa
					id='search-input'
					type='text'
					placeholder='Recipe or ingredient'
					className='bg-gray-200 ml-3 w-full xl:bg-transparent'
					value={currentSearch}
					onChange={(element) => setCurrentSearch(element.target.value)}
					onKeyDown={(event) => handleSearchClick(event)}
				/> 
				<button 
					// Botão para fazer a pesquisa
					className='mr-3'
					onClick={(event) => handleSearchClick(event)}
				>
					<Image
						// Icone de pesquisa
						src='/icons/search.png'
						width={15}
						height={15}
						alt='Search icon'
						onClick={ handleSearch }
						className='mx-2'
					/>
				</button>
			</fieldset>
		</section>
	);
}
