
import { NextRequest, NextResponse } from 'next/server';
import { getRecipeById } from '../recipe.service';
import { HttpStatusCode } from '@/app/lib/HTTPHandler';


export async function GET(req: NextRequest) {

	try {
		const route = req.nextUrl.pathname.split('/');
		const id = route[route.length - 1];
		console.log('route', route);


		const recipe = await getRecipeById(parseInt(id));

		return new NextResponse(JSON.stringify(recipe), { status: HttpStatusCode.OK });
	} catch (error) {
		console.error('Error caught in GET request:', error);
		return new NextResponse(JSON.stringify(error), { status: HttpStatusCode.InternalServerError });
	}
}