import Link from 'next/link';
import React from 'react';

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

export default function RecipesCard({ id, image, title, tags, area, category, type }: recipeProps): JSX.Element {
    return (
        <Link href={`${type}-${id}`}>
            <div className="p-6 text-center mb-4 relative">      
                <picture className='absolute top-8 right-8 cursor-pointer bg-white rounded-full p-2'>
                    <img
                        alt='Favorite button'
                        src='/icons/favorites-notactive.png'
                        className='w-5'
                    />
                </picture>
                <picture>
                    <img
                        alt={title}
                        src={image}
                        className="rounded-3xl"
                    />
                </picture>
                <section className="mt-2 px-4 flex items-center">
                    <h2 className="text-[1.75rem] font-black mr-4 font-croissant">{ title }</h2>
                    <p className="text-sm uppercase font-[600] text-gray-500 tracking-[0.075rem]">{ type === 2 ? 'meal' : 'drink' }</p>
                </section>
            </div>
        </Link>
    )
}
