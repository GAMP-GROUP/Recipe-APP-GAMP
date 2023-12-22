import { HttpStatusCode } from '@/app/lib/HTTPHandler';
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';






export async function GET() {

	try {
      
		const data = await prisma.finished_Recipes.findMany({
			include: {
				recipe: true,
			},
		});

		return NextResponse.json(data, { status: HttpStatusCode.OK });

	} catch (error) {
      
		return NextResponse.json(error, { status: HttpStatusCode.InternalServerError });
	}
}