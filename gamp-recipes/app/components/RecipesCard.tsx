import Link from 'next/link';
import React from 'react';
import FavButton from './FavoriteButton';

type recipeProps = {
	id: number,
	image: string,
	title: string,
	tags: string,
	area?: string | null,
	alcoholic?: string | null,
	category?: string,
	type: number
}


export default function RecipesCard({ id, image, title, type }: recipeProps): JSX.Element {
	return (
		<div className="p-6 text-center mb-4 relative">
			<Link href={`/${id}`} replace>
				<picture>
					<img
						alt={title}
						src={image}
						className="rounded-3xl"
					/>
				</picture>
			</Link>
			<section className="mt-2 px-4 flex items-center justify-between">
				<div
					id='text-info flex row items-center'
				>
					<h2 className="text-[1.75rem] font-black mr-4 font-croissant">{title}</h2>
					<p className="text-sm uppercase font-[600] text-gray-500 tracking-[0.075rem]">{type === 2 ? 'meal' : 'drink'}</p>
				</div>
				<FavButton
					id={id.toString()}
				></FavButton>
			</section>
		</div>
	);
}
