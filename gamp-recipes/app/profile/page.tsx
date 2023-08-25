'use client'
import Image from "next/image"
import Link from "next/link"
// import { UserContext } from "../../contextAPI/context"
// import { useContext } from "react"

export default function ProfilePage() {
  // const { user } = useContext(UserContext);

  return (
    <main className="w-full h-screen pt-8 flex-row bg-gradient-to-br from-cyan-400 via-violet-400 to-pink-500">
      <h3 className='text-center mx-auto font-semibold text-xl text-white'>@mariosanseverino</h3>
      <section
        className='w-11/12 h-[27rem] mt-32 bg-white mx-auto rounded-t-[56px]'>
          <picture>
            <img src="/images/avatar.png" alt="User avatar"
              className='w-48 absolute left-1/2 -translate-x-1/2 -translate-y-28 rounded-full shadow-xl'
            />
          </picture>
          <section className='flex-row justify-evenly pt-24 text-center'>
            <h1 className='text-center mx-auto font-bold text-2xl'>Mario Sanseverino</h1>
            <p className='text-sm'>Porto Alegre, BRA</p>
            <section className='flex justify-evenly pt-10 items-center'>
              <div className='flex items-center'>
                <img src='/icons/favorites-active.png' alt='Fav icon' className='active-profile-icon ' />
                <span className='font-bold text-lg ml-2 text-pink-500'>16</span>
              </div>
              <div className='flex items-center'>
                <img src='/icons/save.png' alt='Fav icon' className='inactive-profile-icon' />
                <span className='text-lg ml-2 opacity-40'>32</span>
              </div>
              <div className='flex items-center'>
                <img src='/icons/cooking.png' alt='Fav icon' className='inactive-profile-icon' />
                <span className='text-lg ml-2 opacity-40'>1</span>
              </div>
            </section>
          </section>
          <section className="w-full h-full mt-6 bg-black"></section>
      </section>
    </main>
  )
}