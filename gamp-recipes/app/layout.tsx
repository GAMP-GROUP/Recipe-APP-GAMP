'use client';
import './reset.css';
import './globals.css';
import './animations.css';
import { usePathname } from 'next/navigation';
import Providers from '@/contextAPI/provider/providers';
import NavigationBar from './components/NavigationBar';
import UserMenu from './components/UserMenu';
import React from 'react';
import AuthProvider from './api/auth/[...nextauth]/authProvider';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const noNavBarRoutes = ['/onboarding', '/auth/signin', '/auth/signup'];
	const checkNoNavBarRoutes = noNavBarRoutes.includes(pathname) ? true : false;

	return (
		<html lang='en' className='w-screen h-full overflow-x-hidden'>
			<body className='w-screen h-full bg-white flex justify-center'>
				<Providers>
					<AuthProvider>
						{ children }
						{ !checkNoNavBarRoutes && (
							<>
								<UserMenu />
								<NavigationBar />
							</>
						) }
					</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
