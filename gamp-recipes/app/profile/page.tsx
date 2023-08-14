'use client'
import Image from "next/image"
import Link from "next/link"
import { UserContext } from "../../contextAPI/context"
import { useContext } from "react"

export default function ProfilePage() {
  const { user } = useContext(UserContext);

  return (
    <main className="w-full flex-row bg-white justify-center mx-1 my-6">
      <Image className="mx-auto rounded-full" src="/icons/bob.jpg" alt="Bob esponja calca quadrada segurando uma espatacula com um hambuguer" width={50} height={50} />
      <section className="text-center">
        <h2 className="font-bold text-2xl">Name{user?.username}</h2>
        <p>Email {user?.email}</p>
      </section>

      <section className="flex-row inline-flex mx-auto w-full ">
        <section className="w-1/2 bg-orange">
          <Link href="/favoriteRecipes">
            <span> Favorite Recipes
              <Image src="/icons/coracao.png" alt="icone de coracao" width={20} height={20} />
            </span>
          </Link>
        </section>
        <section className="w-1/2 bg-brown">
          <Link href="/inProgress">
            <span>In Progress
              <Image src="/icons/cozinhando.png" alt="icone de coracao" width={20} height={20} />
            </span>
          </Link>
        </section>
      </section>
    </main>
  )
}


