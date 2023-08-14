import Image from "next/image"
import Link from "next/link"
import { UserContext } from "../../contextAPI/context"
import { useContext } from "react"

export default function ProfilePage() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Image src="/icons/bob.jpg" alt="Bob esponja calca quadrada segurando uma espatacula com um hambuguer" width={50} height={50} />

      <h2>Name:{user?.username}</h2>
      <h2>Email: {user?.email}</h2>

      <Link href="/favoriteRecipes">
        <span> Favorite Recipes
          <Image src="/icons/coracao.png" alt="icone de coracao" width={20} height={20} />
        </span>
      </Link>
      <Link href="/inProgress">
        <span>In Progress
          <Image src="/icons/cozinhando.png" alt="icone de coracao" width={20} height={20} />
        </span>
      </Link>
    </>
  )
}


