import Link from 'next/link';
import React from 'react';
import FavButton from './FavoriteButton';

type recipeProps = {
	id?: number | null,
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
		<div className={ `text-center mb-4 relative flex flex-col gap-2
		xl:w-64 xl:mx-auto` }>
			<Link href={`/${id}`} replace>
				<picture>
					<img
						alt={title}
						src={image}
						className='object-cover rounded-3xl w-96 h-48 shadow-lg'
					/>
				</picture>
			</Link>
			<section className='px-4 flex items-left text-left justify-between'>
				<div className='flex flex-col gap-2'>
					<h2 className="text-[1.75rem] font-black">{title}</h2>
					<p className={ `text-[0.8rem] w-20 text-white text-center rounded-xl uppercase font-[600] tracking-[0.075rem] ${ type === 2 ? 'bg-red' : 'bg-blue-600' }` }>
						{ type === 2 ? 'meal' : 'drink' }
					</p>
				</div>
				<FavButton
					id={ id!.toString() }
				/>
			</section>
		</div>
	);
}
