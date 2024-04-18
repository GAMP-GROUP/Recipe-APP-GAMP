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
	const capitalize = (word: string): string => {
		const capitalized = word.split('');
		capitalized[0] = capitalized[0].toUpperCase();

		return capitalized.join('');
	};

	const parseAlcohol = (word: string, category: boolean): string => {
		const wordCount = word.split(' ');

		if (wordCount.length < 2) return category ? word.toLowerCase() : word;

		if (wordCount[0] !== 'Non') return category ? wordCount[0].toLowerCase() : wordCount[0];

		return category ? word.replace(' ', '').toLowerCase() : word;
	};

	const bgConfig = (image: string) => {
		return {
			backgroundImage: `url(${image})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'top center',
			backgroundSize: '100%',
			backgroundColor: '#bfbfbf',
			width: '336px',
			height: '256px',
		};
	};
	
	return (
		<div className={ `text-center mb-4 relative flex flex-col gap-2 
		xl:w-64 xl:mx-auto` }>
			<Link href={`/${id}`}>
				<div
					style={bgConfig(image)}
					className='rounded-3xl shadow-lg flex justify-center z-0 bg-blend-multiply'
				>	
					<section
						className='grid grid-cols-2 self-center h-[90%]  w-[90%] z-3'
					>
						<p
							className='text-heading3 self-end justify-self-start text-white shadow-lg'
						>
							{title}
						</p>
						
						<p
							className={`text-strong text-white self-start justify-self-end
							bg-${ alcoholic ? parseAlcohol(alcoholic, true) : category?.toLowerCase()} 
							py-2 px-4 rounded-[999px] flex place-content-evenly`}
						>
							<img
								className='h-[16px] self-center pr-2 invert'
								src={ alcoholic ? '/icons/drinks.svg' : '/icons/meals.svg' }
							/>
							{ alcoholic ? parseAlcohol(alcoholic, false) : capitalize(category as string) }
						</p>
					</section>
					<span
						className={`
						bg-pasta
						bg-pork
						bg-lamb
						bg-chicken
						bg-vegetarian
						bg-beef
						bg-dessert
						bg-side
						bg-seafood
						bg-miscellaneous
						bg-alcoholic
						bg-nonalcoholic 
						bg-optional
						`}
					>
					</span>
				</div>
			</Link>
		</div>
	);
}
