// coloca no lado do cliente
'use client'
// coloca no lado do cliente
import LoginForm from "./components/loginForm"


export default function Login() {
  const content =  (
    <section className="flex min-h-screen  bg-white flex-col items-center justify-between p-24 " >
    <LoginForm />
    </section>
    
  )

  return content
}
