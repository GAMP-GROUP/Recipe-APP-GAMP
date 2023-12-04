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
		<div className={ `p-6 text-center mb-4
		2xl:w-64` }>
			<Link href={`/${id}`} replace>
				<picture>
					<img
						alt={title}
						src={image}
						className="rounded-3xl"
					/>
				</picture>
			</Link>
			<section className="mt-2 px-4 flex items-left text-left justify-between">
				<div>
					<h2 className="text-[1.75rem] font-black">{title}</h2>
					<p className={ `text-[0.8rem] w-20 text-white text-center rounded-xl uppercase font-[600] tracking-[0.075rem] ${ type === 2 ? 'bg-red' : 'bg-blue-600' }` }>
						{ type === 2 ? 'meal' : 'drink' }
					</p>
				</div>
				<FavButton
<<<<<<< HEAD
					id={ id!.toString() }
				/>
=======
					ImgClass='w-7 h-7'
					id={id.toString()}
				></FavButton>
>>>>>>> 0322e5c53a4e4726e5e3d9ba079b67f2bae4b52b
			</section>
		</div>
	);
}
