import { NextRequest } from 'next/server';

export async function postFavorite(req: NextRequest) {
	const { id } = await req.json();
	if (!id) return {
		message: 'Id is missing in Request', error: 'INVALID_INPUT', code: 400
	};

	return { message: 'success' };
} 