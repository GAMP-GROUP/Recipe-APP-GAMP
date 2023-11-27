'use client';
import React from 'react';
import Link from '@/node_modules/next/link';
import { useScrollBlock } from '../utils/useScrollBlock';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';

export default function UserMenu() {
	const { menu, setMenu } = useBehaviorContext();
	const [, allowScroll] = useScrollBlock();
	const menuItems = ['Profile', 'Meals', 'Drinks', 'Favorites'];

	function closeMenu() {
		const menuIcon = document.querySelector('#menu-icon') as HTMLInputElement;
		
		if (menuIcon) {
			menuIcon.checked = false;
		}

		setMenu(false);
		allowScroll();
	}

	return (
		<main
			id='menu-screen'
			className={`w-screen fixed top-16 z-[40] transition-transform duration-700 ${ menu ? 'translate-x-0' : '-translate-x-full' }`}
		>
			<nav id='menu'>
				<ul className="flex-row w-full">
					{menuItems.map((item, index) => (
						<Link href={`/${item.toLowerCase()}`} key={ index }>
							<li
								onClick={ () => closeMenu() }
								className={`relative flex-1 py-4 pl-4 w-full text-lg font-bold ${index === 0 ? 'font-extrabold text-black' : 'font-medium text-gray-500'
								} flex items-center`}>
								<picture>
									<img
										src={ `/icons/${item.toLowerCase()}.png` }
										alt={ `${item} icon` }
										className={ `invert w-6 mr-6 ${ index === 0 ? 'opacity-100' : 'opacity-20' }` }
									/>
								</picture>
								{ item }
								<hr className="absolute w-11/12 opacity-20 border-b border-gray-500 bottom-0 left-1/2 transform -translate-x-1/2" />
							</li>
						</Link>
					))}
				</ul>
			</nav>
			<aside
				id='outside-menu'
				className='h-screen'
				onClick={ () => closeMenu() }
			></aside>
		</main>
	);
}