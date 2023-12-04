import { HttpStatusCode } from '@/app/lib/HTTPHandler';
import { getAuthor } from '../author.service';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(request: NextRequest) {

	try {
		const route = request.nextUrl.pathname.split('/');
		const id = route[route.length - 1];
		console.log('route', route);


		const data = await getAuthor(parseInt(id));

		if (data && data.TYPE === HttpStatusCode.NotFound) {
			return new NextResponse(JSON.stringify(data.message), { status: data.TYPE });
		}

		return new NextResponse(JSON.stringify(data.message), { status: data.TYPE });
	} catch (error) {

		return new NextResponse(JSON.stringify(error), { status: HttpStatusCode.InternalServerError });
	}
}

// export async function PUT(request: NextRequest) {

// 	try {

// 		const json = await request.json();
// 		const data = await updateRecipe(json);

// 		if (data.TYPE === HttpStatusCode.NotFound) {
// 			return new NextResponse(JSON.stringify(data.message), { status: data.TYPE });
// 		}

// 		return new NextResponse(JSON.stringify(data.message), { status: data.TYPE });

// 	} catch (error) {
// 		return new NextResponse(JSON.stringify(error), { status: HttpStatusCode.InternalServerError });
// 	}
// }



