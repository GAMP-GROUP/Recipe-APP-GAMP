'use client';
import './reset.css';
import './globals.css';
import './animations.css';
import Providers from '@/contextAPI/provider/providers';
import NavigationBar from './components/NavigationBar';
import UserMenu from './components/UserMenu';
import SearchBar from './components/SearchBar';
import React from 'react';
import AuthProvider from './api/auth/[...nextauth]/authProvider';
import { useMediaQuery } from 'react-responsive';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isXlScreen = useMediaQuery({ minWidth: 1280 });

	return (
		<html lang='en' className='w-screen h-full overflow-x-hidden'>
			<body className='w-screen h-full bg-white flex justify-center'>
				<Providers>
					<AuthProvider>
						{ isXlScreen ? '' : <SearchBar /> }
						{ children }
						<UserMenu />
						<NavigationBar />
					</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
