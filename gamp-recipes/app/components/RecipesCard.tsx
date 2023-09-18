import Link from "next/link"

type recipeProps = {
    id: number,
    image: string,
    title: string,
    tags: string,
    area?: string | null,
    alcoholic?: string | null,
    category?: string,
    type: 'meal' | 'drink'
}

export default function RecipesCard({ id, image, title, tags, area, category, type }: recipeProps): JSX.Element {
    // const tagItems = tags.split(',').map((tag) => tag.trim());

    return (
        <Link href={`${type}-${id}`}>
            <div className="p-6 text-center mb-6 relative">      
                <picture className='absolute top-8 right-8 cursor-pointer bg-white rounded-full p-2'>
                    <img
                        alt='Favorite button'
                        src='icons/favorites.png'
                        className='w-5'
                    />
                </picture>
                <picture>
                    <img
                        alt={title}
                        src={image}
                    />
                </picture>
                <section className="mt-2 px-4 flex items-center">
                    <h2 className="text-[1.5rem] font-black mr-4">{title}</h2>
                    <p className="uppercase font-[600] text-gray-500">{ type }</p>
                </section>
            </div>
        </Link>
    )
}
