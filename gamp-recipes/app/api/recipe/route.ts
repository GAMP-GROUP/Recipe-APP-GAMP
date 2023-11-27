import { HttpStatusCode } from '@/app/lib/HTTPHandler';
import { createRecipe, deleteRecipe, getRecipes, updateRecipe } from './recipe.service';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(request: NextRequest) {

	try {

		const json = await request.json();
		const data = await createRecipe(json);

		if (data.TYPE === HttpStatusCode.NotFound) {
			return new NextResponse(JSON.stringify(data.message), { status: data.TYPE });
		}

		return new NextResponse(JSON.stringify(data.message), { status: data.TYPE });
	} catch (error) {
		const err = error + ' ' + 'Error caught in POST request:';

		return new NextResponse(JSON.stringify(err), { status: HttpStatusCode.InternalServerError });
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

export async function DELETE(request: NextRequest) {

	try {

		const { id } = await request.json();

		if (!id) {
			return new NextResponse(JSON.stringify('Id is missing in Request'), { status: HttpStatusCode.BadRequest });
		}
		const data = await deleteRecipe(parseInt(id));

		return new NextResponse(JSON.stringify(data), { status: 204 });
	} catch (error) {

		console.error('Error caught in DELETE request:', error);
		return new NextResponse(JSON.stringify(error), { status: HttpStatusCode.InternalServerError });
	}
}



export async function GET() {

	try {
		const data = await getRecipes();
		return new NextResponse(JSON.stringify(data), { status: HttpStatusCode.OK });
	} catch (error) {
		return new NextResponse(JSON.stringify(error), { status: HttpStatusCode.InternalServerError });
	}
}