'use client';
import Image from '@/node_modules/next/image';
import Link from '@/node_modules/next/link';
import { useState, useEffect } from 'react';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import MenuIcon from './MenuIcon';

export default function Header() {
	const [userScroll, setUserScroll] = useState(true);
	const [scrollPosition, setScrollPosition] = useState(0);
	const { setSearchBar } = useBehaviorContext();
	const {status}  = useSession();

	const sessionStatus = status === 'authenticated' ? true : false;

	function scrollPage(): void {
		const currentScrollY = window.scrollY;
		const showHeader = scrollPosition > currentScrollY;

		setUserScroll(showHeader);
		setScrollPosition(currentScrollY);
	}

	useEffect(() => {
		window.addEventListener('scroll', scrollPage);
		return () => {
			window.removeEventListener('scroll', scrollPage);
		};
	}, [scrollPosition]);

	return (
		<header
			id='header'
			className={ `w-full h-12 px-2 py-8 z-[60] bg-yellow flex justify-between items-center sticky top-0 transition-transform duration-300
            ${ userScroll ? 'transform translate-y-0' : '-translate-y-full' }` }
		>
			<div
				className='w-[35px] h-[35px] flex justify-center items-center'
			>
				<MenuIcon />
			</div>
			<Image
				src='/icons/search.png'
				width='25'
				height='25'
				alt='A magnifiyng glass vectorized, representing the search icon'
				className='place-content-end opacity-60'
				onClick={() => setSearchBar(true)}
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
		</header>
	);
}
