'use client';
import React, { useEffect } from 'react';
import Link from '@/node_modules/next/link';
import { useScrollBlock } from '../hooks/useScrollBlock';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import useWindowDimensions from '../hooks/useWindowDimensions';

export default function UserMenu() {
	const { menu, setMenu } = useBehaviorContext();
	const { width } = useWindowDimensions();
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
			className={`w-screen fixed top-0 left-0 right-0 transition-transform duration-300 ${ width <= 1536 ? menu ? 'translate-x-0' : '-translate-x-full' : '' }
			2xl:z-50 2xl:top-20 2xl:left-5 2xl:h-screen 2xl:w-screen 2xl:mr-auto 2xl:flex 2xl:transition-none` }
		>
			<ul className={`flex-row h-full w-screen
			2xl:w-1/5` }>
				{ menuItems.map((item, index) => (
					<Link href={`/${item.toLowerCase()}`} key={index}>
						<li
							onClick={() => closeMenu()}
							onTouchStart={() => closeMenu()}
							className={`relative flex-1 py-4 pl-4 w-full text-lg font-bold ${index === 0 ? 'font-extrabold text-black' : 'font-medium text-gray-500'} flex items-center`}
						>
							<picture>
								<img
									src={`/icons/${item.toLowerCase()}.svg`}
									alt={`${item} icon`}
									className={`w-6 mr-6 ${index === 0 ? 'opacity-100' : 'opacity-20'}`}
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
				2xl:hidden` }
				onClick={() => closeMenu()}
			></aside>
		</menu>
	);
}
