import Link from "next/link"

type recipeProps = {
    id: string,
    thumb: string,
    title: string,
    area?: string,
    alcoholic?: boolean,
    category: string,
    type: 'meal' | 'drink'
}

export default function RecipesCard({ id, thumb, title,area, category, type }: recipeProps): JSX.Element {
    return (
        <Link href={`${type}-${id}`}>
            <div className="p-6 text-center" id={id}>      
                <picture>
                    <img
                        className="rounded-lg"
                        alt={title}
                        src={thumb} />
                </picture>
                <section className="flex">
                <h2 className="inline-flex mt-2 mx-4 my-1">{title}</h2>
                <section className="m-1">
                <h2 className="px-1 flex-2 mx-12 text-[10px] m-1 rounded-md bg-orange-300">{area}</h2>
                <h2 className="px-1 flex-2 mx-12 text-[10px] m-1 rounded-md bg-purple-200 shadow-xl">{category}</h2>
                </section>
                </section>
            </div>
        </Link>
    )
}
