'use client'

import { UserContext } from "@/contextAPI/context";
import { useContext } from "react";
import LoginForm from "./components/loginForm";

export default function Home() {
  const {logging} = useContext(UserContext)
  return (

      <div>

        <h1>RECIPES</h1>

        {
        logging &&
        <LoginForm />
        }

      </div>
  )
  
}
