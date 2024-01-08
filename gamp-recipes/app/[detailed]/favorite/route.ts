
import { userAuth } from '@/app/middlewares/authToken';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest) {
	try {
		const { id } = await request.json();
		const { message, user, error, code } = await userAuth(request);
		console.log('user-linha', user);
		

		if (message !== 'success' || user == undefined) return NextResponse.json({ message, error }, { status: code });
		
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
		return NextResponse.json({ status: 500, message: 'Something went wrong!' });
	}
}
