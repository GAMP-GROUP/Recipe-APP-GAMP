// 'use client'

import { UserContext } from "@/contextAPI/context";
import { useContext } from "react";
import LoginForm from "./components/loginForm";
import { getAllMeals } from "./lib/externalAPI";


export default async function Home() {
  const dataAllMeals = await getAllMeals()
  return (
    <div>
      <section>
        <LoginForm />
      </section>
      <main>
        <h1>RECIPES</h1>
        
        
      </main>
      </div>

  )
  
}
