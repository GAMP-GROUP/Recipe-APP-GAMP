import { NextRequest } from 'next/server';

export function authToken(req: NextRequest) {
	const cookie = req.cookies.get('next-auth.session-token');
	if (!cookie) return {
		message: 'Unauthorized, access denied', error: 'UNAUTHORIZED', code: 401
	};
  
	return { message: 'success' };
}