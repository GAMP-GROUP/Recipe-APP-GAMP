import './reset.css';
import './globals.css';
import './animations.css';
import type { Metadata } from 'next';
import Providers from '@/contextAPI/provider/providers';
import NavigationBar from './components/NavigationBar';
import UserMenu from './components/UserMenu';
import React from 'react';
import AuthProvider from './api/auth/[...nextauth]/authProvider';

export const metadata: Metadata = {
	title: 'Gamp Recipes',
	description: 'Your library of recipes',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<html lang='en' className='w-screen h-full overflow-x-hidden'>
			<body className='w-screen h-full bg-white flex justify-center'>
				<Providers>
					<AuthProvider>
						{ children }
						<UserMenu />
						<NavigationBar />
					</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
