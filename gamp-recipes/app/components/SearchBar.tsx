'use client';
import React, { useEffect } from 'react';
import '../custom-styles.css';
import { useScrollBlock } from '../hooks/useScrollBlock';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import { useState } from 'react';
import Image from '@/node_modules/next/image';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
	const {
		searchBar, setSearchBar,
		setRecipeSearch
	} = useBehaviorContext();
	const [, allowScroll] = useScrollBlock();
	const [currentSearch, setCurrentSearch] = useState('');
	const router = useRouter();

	// Limpa o estado local da pesquisa, possibilita a rolagem da página e fecha a barra de pesquisa
	function closeSearchBar() {
		allowScroll();
		setCurrentSearch('');
		setSearchBar(false);
	}

	// Envia a pesquisa escrita no estado local para o provider,
	// chama a função para fechar a barra de pesquisa
	// e direciona para a página de pesquisa
	const handleSearch = () => {
		setRecipeSearch(currentSearch);
		closeSearchBar();
		router.push(`/search/${currentSearch}`);
	};

	// Recebe os eventos de click na lupa ou botão 'Enter' para disparar a pesquisa
	const handleSearchClick = (
		event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (('key' in event && event.key === 'Enter') || ('type' in event && event.type === 'click')) {
			handleSearch();
		}
		// ESC fecha a barra de pesquisa
		if (('key' in event && event.key === 'Escape')) {
			closeSearchBar();
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeSearchBar();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<section
			id='searchBar'
			className={`z-[99] w-screen fixed top-0 transition-transform ${ searchBar ? 'translate-y-0' : '-translate-y-16' }
			2xl:top-16 2xl:w-96` }
		>
			{/* A tela toda */}
			<section
				className={ 'w-full h-16 bg-white py-3 px-6 flex justify-between items-center 2xl:bg-transparent' }
			> {/* O container branco */}
				<fieldset className='w-11/12 bg-gray-200 rounded-xl py-1 mr-3 self-center flex justify-between place-items-center'>
					<input
						id='search-input'
						type='text'
						placeholder='Recipe or ingredient'
						className='bg-gray-200 ml-3 w-full 2xl:bg-transparent'
						value={currentSearch}
						onChange={(element) => setCurrentSearch(element.target.value)}
						onKeyDown={(event) => handleSearchClick(event)}
					/> {/* O campo para inserir o termo de pesquisa */}
					<button
						className='mr-3'
						onClick={(event) => handleSearchClick(event)}
					>
						<Image
							src='/icons/search.png'
							width={15}
							height={15}
							alt='Search icon'
							onClick={closeSearchBar}
							className='ml-2'
						/> {/* Icone de pesquisa */}
					</button> {/* Botão para fazer a pesquisa */}
				</fieldset> {/* Todo container que abrange o campo input mais o botão */}
				<button onClick={closeSearchBar}>
					<picture>
						<img
							src='/icons/close-white.png'
							alt='Close icon'
							className={ `bg-gray-800 rounded-full p-1 w-5
							2xl:hidden` }
						/> {/* Botão para fechar a barra de pesquisa */}
					</picture>
				</button>
			</section>
			{searchBar &&
				<div
					className='overlay'
					onClick={() => closeSearchBar()}
				/>} { /*Resto da tela além da barra de pesquisa*/}
		</section>
	);
}
