'use client'
import Image from "next/image"
import Link from "next/link"
// import { UserContext } from "../../contextAPI/context"
// import { useContext } from "react"

export default function ProfilePage() {
  // const { user } = useContext(UserContext);
  function profileLink(linkName: string, quantity: number) {
    return (
      <section className="text-center w-1/3">
        <Link href={ `/${linkName.toLowerCase()}` }>
          <h3 className="text-red">{ quantity }</h3>
          <h4 className="mt-1">{ linkName }</h4>
        </Link>
      </section>
    )
  }

  return (
    <main className="min-h-screen w-full flex-row pt-12 bg-gradient-to-br from-red/75 to-white/75">
      
      <picture>
        <img
          className="mx-auto rounded-full absolute inset-l-1/2 transform translate-x-1/2 shadow-lg"
          src="/images/avatar.png"
          alt="Bob esponja calca quadrada segurando uma espatacula com um hambuguer"
        />
      </picture>

      <section className="bg-white mx-auto mt-[100px] h-[700px] ml-[-50%] w-[200%] rounded-t-[100%]">
        
        <section className="text-center mb-4 pt-28">
          <h2 className="font-bold text-2xl mt-4">Poliana Marques</h2>
          <h4>Since: 14/08/2023</h4>
          <h4>pollymarques@gmail.com</h4>
          <button type="button" className="bg-gold text-white rounded-3xl p-3 mt-2 font-bold">Subscribe</button>
        </section>

        <section className="w-screen flex mx-auto px-10">
          { profileLink('Favorites', 12) }
          { profileLink('Done', 6) }
          { profileLink('In Progress', 1) }
        </section>
        
      </section>

    </main>
  )
}
