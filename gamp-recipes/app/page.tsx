import prisma from "@/prisma/client"
import RecipesFeed from "./components/RecipesFeed";

export default async function Home() {
  const meals = await prisma.recipes.findMany({
    where: { recipe_type_id: 2 }
  })
  const drinks = await prisma.recipes.findMany({
    where: { recipe_type_id: 1 }
  })

  return (
    <div>
      <main className='h-full w-full'>
        <section className="flex-row">
          <RecipesFeed
            recipesQuantity={12}
            type="drink"
            recipes={meals}
          />
        </section>
      </main>
    </div>
  )
}
