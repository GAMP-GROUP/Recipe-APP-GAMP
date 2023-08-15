'use client'
import { useContext } from "react"
import { UserProvider } from "../context"
import { BehaviorProvider } from "../context/behavior.context"

export default function Providers({ children }:{children: React.ReactNode}) {
return (
  <BehaviorProvider>
    <UserProvider>
      {children}
    </UserProvider>
  </BehaviorProvider>
  )
}

