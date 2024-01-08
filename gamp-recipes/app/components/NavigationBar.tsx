'use client';
import React from 'react';
import Image from '@/node_modules/next/image';
import { useScrollBlock } from '../hooks/useScrollBlock';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import { signOut, useSession } from 'next-auth/react';
import MenuIcon from './MenuIcon';
import GampLogo from './GampLogo';
import SearchBar from './SearchBar';
import SignOutButton from './SignOutButton';
import SignInButton from './SignInButton';

export default function NavigationBar() {
	const [blockScroll, allowScroll] = useScrollBlock();
	const { searchBar, setSearchBar, menu, setMenu } = useBehaviorContext();
	const { status } = useSession();
	const sessionStatus = status === 'authenticated' ? true : false;

	// Abre a barra de pesquisa e impossibilita a rolagem da página pelo usuário
	function toggleSearchBar(): void {
		if (searchBar) {
			setSearchBar(false);
			allowScroll();
		} else {
			setSearchBar(true);
			blockScroll();

			const searchInput = document.getElementById('search-input');

			if (searchInput) {
				searchInput.focus();
			}
		}
	}

	// Abre e fecha o menu a partir do clique no ícone
	function toggleMenu(menu: boolean): void {
		if (menu) {
			setMenu(false);
			allowScroll();
		} else {
			setMenu(true);
			blockScroll();
		}
	}

	return (
		<nav
			id='navigation-bar'
			className={`fixed w-screen bottom-0 h-16 px-4 bg-yellow z-60 flex justify-evenly items-center gap-4 shadow-lg
			xl:w-screen xl:top-0 xl:grid xl:grid-cols-3 xl:gap-y-0 xl:rounded-none xl:shadow-none xl:px-80` }
		>
			<MenuIcon
				menu={menu}
				toggleMenu={toggleMenu}
			/>

			<Image
				src='/icons/search.png'
				width='25'
				height='25'
				alt='A magnifiyng glass vectorized, representing the search icon'
				className='xl:hidden'
				onClick={ () => toggleSearchBar() }
			/>

			<SearchBar />

			<GampLogo />

			{
				sessionStatus ? (
					<SignOutButton signOut={ signOut } />
				) : (
					<SignInButton />
				)
			}
		</nav>
	);
}
