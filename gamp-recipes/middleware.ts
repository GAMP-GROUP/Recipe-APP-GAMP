import { NextResponse, NextRequest } from 'next/server';
import { authToken } from './app/middlewares/authToken';
import { postFavorite } from './app/middlewares/postFavorite';
import { validateRecipeMiddleware } from './app/middlewares/createRecipeFields';

export async function middleware(req: NextRequest) {
	const route = req.nextUrl.pathname.split('/');
	if (route.includes('favorite')) {
		const token = authToken(req);
		const body = await postFavorite(req);

		if (token.message !== 'success') {
			const { message, error, code } = token;
			return NextResponse.json({	message, error	}, { status: code });
		}
		if (body.message !== 'success') {
			const { message, error, code } = body;
			return NextResponse.json({ message,	error }, { status: code });
		}
		
	}

	// if(route.includes('create-recipe')){
	// 	const token = authToken(req);
	// 	if (token.message !== 'success') {
	// 		const { message, error, code } = token;
	// 		return NextResponse.json({	message, error	}, { status: code });
	// 	}
	// 	const body = await validateRecipeMiddleware(req);
	// 	if (body) {
	// 		return body;
	// 	}
	// }
	
}