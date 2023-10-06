import { decode } from '@/app/lib/jwtUtils';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest) {
	try {
		const cookie = request.cookies.get('next-auth.session-token');
		
		if (!cookie) return NextResponse.json(
			{	
				message: 'Unauthorized, access denied',
				error: 'UNAUTHORIZED'
			},
			{ status: 401 },
		);
		
		const payload = {
			token: cookie.value,
			secret: process.env.NEXTAUTH_SECRET as string,
		};
		
		const auth = await decode(payload);
		
		const { id } = await request.json();
		
		const user = await prisma.user.findUnique({
			where: { email: auth.email }
		});

		if(user === null) return NextResponse.json(
			{
				message: 'User not Found!', 
				error: 'NOT_FOUND'
			},
			{ status: 404 }
		);

		if(!id) return NextResponse.json(
			{
				message: 'Id is missing in Request',
				error: 'INVALID_INPUT'
			},
			{ status: 400}
		);
		
		const favoriteRecipe = await prisma.favorite_Recipes.findFirst({
			where: { user_id: user.id,	recipe_id: Number(id), }});
			
		if (favoriteRecipe === null) {
			const created = await prisma.favorite_Recipes.create({
				data: { user_id: user.id,	recipe_id: Number(id), fav: true }
			});
				
			return NextResponse.json({message: created});
		}
			
		if (favoriteRecipe !== null) {
			const updated = await prisma.favorite_Recipes.update({
				where: { id: favoriteRecipe?.id },
				data: { fav: !favoriteRecipe.fav }
			});
			
			return NextResponse.json({message: updated });
		}
	} catch (e) {
		return NextResponse.json({ status: 500, message: 'Something Went Wrong!' });
	}
}