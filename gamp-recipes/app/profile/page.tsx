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
          <h3 className={ linkName === 'Favorites' ? 'text-red' : '' }>{ quantity }</h3>
          <h4 className="mt-1">{ linkName }</h4>
        </Link>
      </section>
    )
  }

  return (
    <main className="min-h-screen w-full flex-row pt-12 bg-gradient-to-br from-slate-900/75 to-black">
      
      asada

    </main>
  )
}
