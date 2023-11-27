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
			className='fixed bottom-0 left-0 right-0 w-screen h-16 px-8 bg-transparent z-60 flex justify-around items-center'
		>
			<div
				className='w-[35px] h-[35px] flex justify-center items-center'
			>
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
				className='place-content-end'
				onClick={ () => toggleSearchBar() }
			/>
			<Link href='/'>
				<picture>
					<img
						id='gamp-logo'
						className='transition-all duration-300 w-[62px]'
						src='/images/logo-simple.png'
						alt='Our logo'
					/>
				</picture>
			</Link>
			{
				sessionStatus ? (
					<button
						onClick={() => signOut()}
						className='text-sm font-semibold px-5 py-1 mr-2 bg-black text-white rounded-2xl'
					>
						Sign Out
					</button>

				) : (
					<Link href='/auth/signin'>
						<button className='text-sm font-semibold px-5 py-1 mr-2 bg-black text-white rounded-2xl'>
							Sign In
						</button>
					</Link>

				)
			}
		</nav>
	);
}
