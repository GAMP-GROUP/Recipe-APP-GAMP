'use client'

import LoginForm from "../components/loginForm";
import { UserContext } from "@/contextAPI/context";
import { useContext } from "react";


export default function Recipes() {
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
