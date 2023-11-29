'use client';
import React from 'react';
import Image from '@/node_modules/next/image';
import Link from '@/node_modules/next/link';
import { useScrollBlock } from '../utils/useScrollBlock';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import { signOut, useSession } from 'next-auth/react';
import MenuIcon from './MenuIcon';

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
			className='fixed mx-auto bottom-6 rounded-3xl h-16 px-4 bg-yellow z-60 flex justify-evenly items-center gap-8 shadow-md'
		>
			<div
				id='left-navigation-bar'
				className='flex flex-row w-18 gap-6 items-center'
			>
				<div className="w-7">
					<MenuIcon
						menu={menu}
						toggleMenu={toggleMenu}
					/>
				</div>
				<Image
					src='/icons/search.png'
					width='25'
					height='25'
					alt='A magnifiyng glass vectorized, representing the search icon'
					onClick={ () => toggleSearchBar() }
				/>
			</div>
			<div
				id="center-navigation-bar"
				className='w-18'
			>
				<Link href='/'>
					<Image
						src='/images/logo-simple.png'
						width={ 60 }
						height={ 60 }
						alt='logo'
					/>
				</Link>
			</div>
			<div
				id="right-navigation-bar"
				className='w-18'
			>
				{
					sessionStatus ? (
						<button
							onClick={ () => signOut() }
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
			</div>
		</nav>
	);
}
