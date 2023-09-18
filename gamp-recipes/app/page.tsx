import RecipesFeed from "./components/RecipesFeed";
import prisma from "@/prisma/client"

export default async function Home() {
  const meals = await prisma.recipes.findMany({
    where: { recipe_type_id: 2 }
  })
  const drinks = await prisma.recipes.findMany({
    where: { recipe_type_id: 1 }
  })

  return (
    <div>
      <main className='h-full'>
        <section>
          <RecipesFeed
            recipesQuantity={6}
            type="meal"
            recipes={meals}
          />
        </section>
      </main>
    </div>
  )
}
