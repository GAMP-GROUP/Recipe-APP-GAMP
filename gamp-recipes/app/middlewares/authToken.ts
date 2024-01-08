import { NextRequest } from 'next/server';
import prisma from '@/prisma/client';
import { decode } from '../lib/jwtUtils';

export function authToken(req: NextRequest) {
	const cookie = req.cookies.get('next-auth.session-token');

	if (!cookie) return {
		message: 'Unauthorized, access denied', error: 'UNAUTHORIZED', code: 401
	};

	return { message: 'success' };
}

export async function userAuth(req: NextRequest) {
	try {
		const cookie = req.cookies.get('next-auth.session-token');

		if (cookie === undefined) return { message: 'Unauthorized, access denied', error: 'UNAUTHORIZED', code: 401 };

		const payload = {
			token: cookie.value,
			secret: process.env.NEXTAUTH_SECRET as string,
		};

		const auth = await decode(payload);
		const user = await prisma.user.findUnique({
			where: { email: auth.email }
		});

		if (user === null) return { message: 'User not Found!', error: 'NOT_FOUND', code: 404 };

		return { message: 'success', user };
	} catch (e) {
		return { message: 'Invalid Token', error: 'UNAUTHORIZED', code: 401 };
	}
}