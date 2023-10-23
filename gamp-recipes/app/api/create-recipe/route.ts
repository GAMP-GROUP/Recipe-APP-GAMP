import { HttpStatusCode } from '@/app/lib/HTTPHandler';
import { createRecipe, updateRecipe } from './createRecipe.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try{
		const json = await request.json();
		const data = await createRecipe(json);
		if (data.TYPE === HttpStatusCode.NotFound) {
			return new NextResponse(JSON.stringify(data.message), { status: data.TYPE });
		}

		return new NextResponse(JSON.stringify(data.message), { status: data.TYPE });
	} catch (error) {
		return new NextResponse(JSON.stringify(error), { status: HttpStatusCode.InternalServerError });
	}
}

export async function PUT(request: NextRequest) {
	try {
		const json = await request.json();
		const data = await updateRecipe(json);
		if (data.TYPE === HttpStatusCode.NotFound) {
			return new NextResponse(JSON.stringify(data.message), { status: data.TYPE });
		}

		return new NextResponse(JSON.stringify(data.message), { status: data.TYPE });
	} catch (error) {
		return new NextResponse(JSON.stringify(error), { status: HttpStatusCode.InternalServerError });
	}
}