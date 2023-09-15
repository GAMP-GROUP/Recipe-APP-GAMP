'use client';
import React from 'react';
import { ButtonProps } from '@/types';

export default function FavButton({id}: ButtonProps) {

	function favHandle(e: React.MouseEvent<HTMLButtonElement>) {
		const favRecipes = JSON.parse(localStorage.getItem('favorite') as string) || [];
		const id = (e.target as Element).id;
		const alreadyFav = favRecipes.some((recipe: string) => recipe === id);
		const temp = alreadyFav ? favRecipes.filter((each: string) => each !== id) 
			: [...favRecipes, id];
      
		localStorage.setItem('favorite', JSON.stringify(temp));
	}

	return (
		<button
			id={`${id}`}
			onClick={(e) => favHandle(e)}
			className='rounded-full bg-yellow bg-auto p-5 mb-4 uppercase'
		>
      ADD TO FAVORITES
		</button>
	);
  
}