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
    <main className="w-full pt-8 flex-row bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-400">
      <section
        className='w-11/12 h-[27rem] mt-32 bg-white mx-auto rounded-t-[56px]'>
          <picture>
            <img src="/images/avatar.png" alt="User avatar"
              className='w-48 absolute left-1/2 -translate-x-1/2 -translate-y-28 rounded-full shadow-xl'
            />
          </picture>
          <section className='flex-row justify-evenly pt-24 text-center'>
            <h1 className='mx-auto font-bold text-2xl'>@mariosanseverino</h1>
            <span className='text-sm'>Porto Alegre, BRA</span>
            <section className='flex justify-evenly pt-10'>
              <div className='bg-red text-white p-3 rounded-3xl'>
                <h2 className='text-6xl font-bold py-3'>16</h2>
                <div className='flex items-center'>
                  <img src='/icons/favorites.png' alt='Fav icon' className='w-4 h-4 mr-2' />
                  <span className='font-semibold'>Favorites</span>
                </div>
              </div>
              <div>
                <h3 className='text-4xl font-bold py-2'>9</h3>
                <span>Done</span>
              </div>
              <div>
                <h3 className='text-4xl font-bold py-2'>1</h3>
                <span>In Progress</span>
              </div>
            </section>
            <section>
              
            </section>
          </section>
      </section>
    </main>
  )
}