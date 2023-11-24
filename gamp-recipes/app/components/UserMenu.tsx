'use client';
import React from 'react';
import Link from '@/node_modules/next/link';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import { Dispatch, SetStateAction } from 'react';

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
		<main
			id='menu-screen'
			className={ `w-screen fixed top-16 z-[40] transition-transform duration-700 ${ menu ? 'translate-x-0' : '-translate-x-full' }` }
		>
			<nav
				id='menu'
			>
				<ul className="flex-row w-full">
					{menuItems.map((item, index) => (
						<Link href={`/${item.toLowerCase()}`} key={index} onClick={removeOverflow}>
							<li
								onClick={() => setMenu(false)}
								className={`flex-1 py-4 pl-4 w-full text-lg font-bold ${index === 0 ? 'font-extrabold text-black' : 'font-medium text-gray-500'
								} flex items-center border-b-gray-500 border-1 shadow`}>
								<picture>
									<img
										src={`/icons/${item.toLowerCase()}.png`}
										alt={`${item} icon`}
										className={`invert w-6 mr-6 ${index === 0 ? 'opacity-100' : 'opacity-20'
										}`}
									/>
								</picture>
								{item}
								<hr />
							</li>
						</Link>
					))}
				</ul>
			</nav>
			<aside
				id='outside-menu'
				className='h-screen'
				onClick={() => toggleMenu(menu, setMenu)}
			></aside>
		</main>
	);
}