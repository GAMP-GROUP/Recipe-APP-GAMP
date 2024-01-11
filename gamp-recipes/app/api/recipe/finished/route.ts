
import { NextRequest, NextResponse } from 'next/server';
import { HttpStatusCode } from '@/app/lib/HTTPHandler';
import { userAuth } from '@/app/middlewares/authToken';
import prisma from '@/prisma/client';


export  async function GET(req: NextRequest) {


	const route = req.nextUrl.pathname.split('/');
	console.log(route);

	const { message, user } = await userAuth(req);
	if (message !== 'success' || user == undefined) return { message, TYPE: HttpStatusCode.Unauthorized };

	console.log('14---------------------  ' + user);
	
	try {
      
		const data = await prisma.finished_Recipes.findMany({
			where: {
				user_id: user.id,
			},
			include: {
				recipe: true,
			},
		});
		

		return NextResponse.json(data, { status: HttpStatusCode.OK });

	} catch (error) {
      
		return NextResponse.json(error, { status: HttpStatusCode.InternalServerError });
	}
}
