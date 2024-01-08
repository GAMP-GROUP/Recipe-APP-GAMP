'use client';
<<<<<<< HEAD
import Link from '@/node_modules/next/link';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import { Dispatch, SetStateAction } from 'react';
import React from 'react';


export function toggleMenu(menu: boolean, setMenu: Dispatch<SetStateAction<boolean>>) {
	const body = document.querySelector('body');
	setMenu(!menu);
	menu === false ? body!.classList.add('overflow-hidden') : body!.classList.remove('overflow-hidden');
}

export default function UserMenu() {
	const { menu, setMenu } = useBehaviorContext();
	const menuItems = ['Profile', 'Meals', 'Drinks', 'Favorites'];
	function removeOverflow() {
		const body = document.querySelector('body');
		body?.classList.remove('overflow-hidden');
	}

	return (
		<main id='menu-screen' className='w-screen fixed top-16 z-[50]' hidden={ menu === false ? true : false }>
			<nav
				id='menu'
				className={'h-screen w-full bg-white'}
			>
				<ul className="flex-row w-full">
					{ menuItems.map((item, index) => (
						<Link href={ `/${item.toLowerCase()}` } key={ index } onClick={ removeOverflow }>
							<li
								onClick={ () => setMenu(false) }
								className={ `flex-1 py-4 pl-4 w-full text-lg font-bold ${ index === 0 ? 'font-extrabold text-black' : 'font-medium text-gray-500' } flex items-center border-b-gray-500 border-1 shadow` }>
								<picture>
									<img
										src={ `/icons/${item.toLowerCase()}.png` }
										alt={ `${item} icon` }
										className={ `invert w-6 mr-6 ${ index === 0 ? 'opacity-100' :  'opacity-20' }` }
									/>
								</picture>
								{ item }
								<hr />
							</li>
						</Link>
					))}
				</ul>
			</nav>
			<aside
				id='outside-menu'
				className='h-screen'
				onClick={ () => toggleMenu(menu, setMenu) }
			>
			</aside>
		</main>
=======
import React, { useEffect } from 'react';
import Link from '@/node_modules/next/link';
import { useScrollBlock } from '../hooks/useScrollBlock';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';

export default function UserMenu() {
	const { menu, setMenu } = useBehaviorContext();
	const [, allowScroll] = useScrollBlock();
	const menuItems = ['Profile', 'Meals', 'Drinks', 'Favorites', 'Create'];

	function closeMenu() {
		const menuIcon = document.querySelector('#menu-icon') as HTMLInputElement;

		if (menuIcon) {
			menuIcon.checked = false;
		}

		setMenu(false);
		allowScroll();
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeMenu();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<menu
			id='user-menu'
			className={`w-screen fixed top-0 left-0 right-0 transition-transform duration-300 ${ menu ? 'translate-x-0' : '-translate-x-full' }
			2xl:hidden` }
		>
			<ul className='flex-row h-full w-screen'>
				{ menuItems.map((item, index) => (
					<Link href={`/${item.toLowerCase()}`} key={index}>
						<li
							onClick={() => closeMenu()}
							onTouchStart={() => closeMenu()}
							className={ `relative flex-1 py-4 pl-4 w-full text-lg font-bold ${ index === 0 ? 'font-extrabold text-black' : 'font-medium text-gray-500' } flex items-center` }
						>
							<picture>
								<img
									src={ `/icons/${item.toLowerCase()}.svg` }
									alt={ `${item} icon` }
									className={ `w-6 mr-6 ${index === 0 ? 'opacity-100' : 'opacity-20'}` }
								/>
							</picture>
							{item}
							<hr className="absolute w-11/12 opacity-20 border-b border-gray-500 bottom-0 left-1/2 transform -translate-x-1/2" />
						</li>
					</Link>
				))}
			</ul>
			<aside
				id='outside-menu'
				className={`h-screen w-screen
				xl:hidden` }
				onClick={() => closeMenu()}
			></aside>
		</menu>
>>>>>>> main
	);
}
