'use client';
import React from 'react';
import Image from '@/node_modules/next/image';
import Link from '@/node_modules/next/link';
import { useScrollBlock } from '../hooks/useScrollBlock';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import { signOut, useSession } from 'next-auth/react';
import MenuIcon from './MenuIcon';

export default function NavigationBar() {
	const [blockScroll, allowScroll] = useScrollBlock();
	const { searchBar, setSearchBar, menu, setMenu } = useBehaviorContext();
	const { status } = useSession();
	const screenWidth = window.innerWidth;
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

	function toggleMenuIcon(screenWidth: number): boolean {
		if (screenWidth >= 1536) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<nav
			id='navigation-bar'
			className={`fixed mx-auto bottom-6 rounded-3xl h-16 px-4 bg-gradient-to-b from-yellow to-amber-300 z-60 flex justify-evenly items-center gap-8 shadow-lg
			2xl:w-screen 2xl:top-0 2xl:justify-between 2xl:rounded-none 2xl:shadow-none` }
		>
			<MenuIcon
				hidden={toggleMenuIcon}
				menu={menu}
				toggleMenu={toggleMenu}
			/>

			<Image
				src='/icons/search.png'
				width='25'
				height='25'
				alt='A magnifiyng glass vectorized, representing the search icon'
				onClick={() => toggleSearchBar()}
			/>

			<Link
				href='/'
				className={`${screenWidth >= 1536 ? 'order-first' : ''}`}
			>
				<Image
					src={'/images/logo-simple.png'}
					width={60}
					height={60}
					alt='logo'
				/>
			</Link>

			{
				sessionStatus ? (
					<button
						onClick={() => signOut()}
						className='text-sm font-semibold px-5 py-1 bg-black text-white rounded-2xl'
					>
						Sign Out
					</button>

				) : (
					<Link href='/auth/signin'>
						<button className='text-sm font-semibold px-4 py-1 bg-black text-white rounded-2xl'>
							Sign In
						</button>
					</Link>

				)
			}

		</nav>
	);
}
