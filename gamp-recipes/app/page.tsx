import RecipesFeed from "./components/RecipesFeed";
import prisma from "@/prisma/client"

export default async function Home() {
  const drinks = await prisma.recipes.findMany({
    where: { recipe_type_id: 1 }
  })


  return (
    <div>
      <main className='h-full'>
        <section className="p">
          <RecipesFeed
            recipesQuantity={6}
            type="drinks"
            recipes={drinks}
          />
        </section>
      </main>
    </div>
  )
}
