'use client'
import Image from "next/image"
import Link from "next/link"
// import { UserContext } from "../../contextAPI/context"
// import { useContext } from "react"

export default function ProfilePage() {
  // const { user } = useContext(UserContext);
  function profileLink(linkName: string, quantity: number) {
    return (
      <section className="text-center py-4 mx-2">
      <Link href={ `/${linkName.toLowerCase()}` }>
        <h3 className="text-orange">{ quantity }</h3>
        <h4 className="mt-1">{ linkName }</h4>
      </Link>
    </section>
    )
  }

  return (
    <main className="w-full flex-row pt-12 bg-apple">
      
        <picture>
          <img className="mx-auto rounded-full absolute inset-l-1/2 transform translate-x-1/2" src="/images/avatar.png" alt="Bob esponja calca quadrada segurando uma espatacula com um hambuguer" />
        </picture>

      <section className="bg-white mx-auto bottom-0 mt-[100px] ml-[-50%] h-[500px] w-[200%] rounded-t-[100%]">

          <section className="text-center mb-4 pt-28">
            <h2 className="font-bold text-2xl mt-4 text-apple">Poliana Marques</h2>
            <h4>Since: 14/08/2023</h4>
            <h4>pollymarques@gmail.com</h4>
            <button type="button" className="bg-brown text-white rounded-3xl p-3 mt-2 font-bold">Subscribe</button>
          </section>

          <section className="w-full">
            { profileLink('Favorites', 12) }
            { profileLink('Done', 6) }
            { profileLink('In Progress', 1) }
          </section>

      </section>

    </main>
  )
}
