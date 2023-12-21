'use client';
import React from 'react';
import Image from '@/node_modules/next/image';
import Link from '@/node_modules/next/link';
import { useScrollBlock } from '../hooks/useScrollBlock';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import { signOut, useSession } from 'next-auth/react';
import MenuIcon from './MenuIcon';
// import BigScreenNavigationOptions from './BigScreenNavigationOptions';

export default function NavigationBar() {
	const [blockScroll, allowScroll] = useScrollBlock();
	const { menu, setMenu } = useBehaviorContext();
	const { status } = useSession();
	const sessionStatus = status === 'authenticated' ? true : false;

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
			className={`fixed w-screen bottom-0 h-16 px-4 bg-yellow z-60 flex justify-evenly items-center gap-8 shadow-lg
			xl:w-screen xl:top-0 xl:justify-between xl:rounded-none xl:shadow-none xl:px-96` }
		>
			<MenuIcon
				menu={menu}
				toggleMenu={toggleMenu}
			/>

			<Link
				href='/'
				className={'xl:order-first'}
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
