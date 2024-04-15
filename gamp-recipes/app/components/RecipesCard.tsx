import Link from 'next/link';
import React from 'react';

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


export default function RecipesCard({ id, image, title, category, alcoholic }: recipeProps): JSX.Element {
	function capitalize(word: string): string {
		const capitalized = word.split('');
		capitalized[0] = capitalized[0].toUpperCase();

		return capitalized.join('');
	}
	
	return (
		<div className={ `text-center mb-4 relative flex flex-col gap-2 
		xl:w-64 xl:mx-auto` }>
			<Link href={`/${id}`}>
				<div
					style={{
						backgroundImage: `url(${image})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'top center',
						backgroundSize: '100%',
						width: '336px',
						height: '256px',
					}}
					className='rounded-3xl shadow-lg flex justify-center'
				>	<section
						className='grid grid-cols-2 self-center h-[90%]  w-[90%]'
					>
						<p
							className='text-heading3 self-end justify-self-start text-white shadow-lg'
						>
							{title}
						</p>
						
						<p
							className={`text-strong text-white self-start justify-self-end
							bg-${ alcoholic ? alcoholic?.toLowerCase().replace(' ', '') : category?.toLowerCase()} 
							py-2 pr-2 rounded-xl flex place-content-evenly`}
						>
							<img
								className='h-[12px] self-center px-2'
								src='/icons/category_icon.png'
							/>
							{ alcoholic || capitalize(category as string) }
						</p>
					</section>
					<span
						className='bg-pork bg-alcoholic bg-nonalcoholic bg-beef bg-vegetarian bg-chicken bg-pasta'
					>

					</span>
				</div>
			</Link>
		</div>
	);
}
