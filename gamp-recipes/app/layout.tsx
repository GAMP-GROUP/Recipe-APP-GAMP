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
import { Lato } from 'next/font/google';

const lato = Lato({
	weight: ['100', '300', '400', '700', '900'],
	display: 'swap',
	subsets: ['latin'],
	variable: '--lato-font'
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isOnboarding = pathname === '/onboarding' ? true : false;

	return (
		<html lang='en' className={ `w-screen h-full overflow-x-hidden ${ lato.className }` }>
			<body className='w-screen h-full bg-white flex justify-center'>
				<Providers>
					<AuthProvider>
						{ children }
						{ !isOnboarding && (
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
