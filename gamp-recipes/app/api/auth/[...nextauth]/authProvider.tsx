'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface ProviderProps {
	children: React.ReactNode | React.ReactNode[];
}

const AuthProvider = ({ children }: ProviderProps) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
