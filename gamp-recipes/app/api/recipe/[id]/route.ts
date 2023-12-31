
import { NextRequest, NextResponse } from 'next/server';
import { getRecipeById } from '../recipe.service';
import { HttpStatusCode } from '@/app/lib/HTTPHandler';
import { userAuth } from '@/app/middlewares/authToken';
import prisma from '@/prisma/client';

export async function GET(req: NextRequest) {

	try {
		const route = req.nextUrl.pathname.split('/');
		const id = route[route.length - 1];
		const recipe = await getRecipeById(parseInt(id));

		return NextResponse.json(recipe, { status: 200 });
	} catch (error) {
		console.error('Error caught in GET request:', error);
		return NextResponse.json(error, { status: HttpStatusCode.InternalServerError });
	}
}

export async function POST(req: NextRequest) {
	
	try {
		
		const route = req.nextUrl.pathname.split('/');
		const id = route[route.length - 1];
		const { message, user } = await userAuth(req);

		if (message !== 'success' || user == undefined) return { message, TYPE: HttpStatusCode.Unauthorized };

		const recipe = await prisma.finished_Recipes.upsert({
			where: {
				user_id_recipe_id: {
					user_id: user.id,
					recipe_id: parseInt(id),
				},
			},
			create: {
				user_id: user.id,
				recipe_id: parseInt(id),
			},
			update: {
				user_id: user.id,
				recipe_id: parseInt(id),

			},
		});

		return NextResponse.json(recipe, { status: 200 });

	} catch (error) {
		console.error('Error caught in POST request:', error);
		return NextResponse.json(error, { status: HttpStatusCode.InternalServerError });
	}
}