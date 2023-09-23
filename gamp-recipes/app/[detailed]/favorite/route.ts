import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest) {
	//Recebe id do POST request disparado pelo FavoriteButton
	const { id } = await request.json(); 
	//Explorar uma maneira de passar a chave primária do usuário no POST
	const user_id = 1;

	if(!id) return NextResponse.json({ message: 'Id is missing in Request', error: 'INVALID_INPUT'});
	
	const favoriteRecipe = await prisma.favorite_Recipes.findFirst({
		where: { user_id,	recipe_id: Number(id), }});

	if (favoriteRecipe === null) {
		const created = await prisma.favorite_Recipes.create({
			data: { user_id,	recipe_id: Number(id), fav: true }
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
}