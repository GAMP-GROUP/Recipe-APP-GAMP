import { HttpStatusCode } from '@/app/lib/HTTPHandler';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { userAuth } from '@/app/middlewares/authToken';

export async function GET(request: NextRequest) {
	
	try {
		const { message, user, error, code } = await userAuth(request);		
		
		if (message !== 'success' || user == undefined) return NextResponse.json({ message, error }, { status: code });
		const data = await prisma.user.findUnique({
			where: {
				id: user.id,
			},
			include: {
				Finished_Recipes: true,
				Favorite_Recipes:true
			}

		});
		
		return new NextResponse(JSON.stringify(data), { status: HttpStatusCode.OK});
	} catch (error) {

		return new NextResponse(JSON.stringify(error), { status: HttpStatusCode.InternalServerError });
	}
}