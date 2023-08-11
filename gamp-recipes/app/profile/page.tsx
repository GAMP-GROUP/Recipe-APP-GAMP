import Image from "next/image"
import Link from "next/link"


export default function ProfilePage() {
  return (
    <>
    <h2>Name:</h2>
  
    <Image src="/icons/bob.jpg" alt="Bob esponja calca quadrada segurando uma espatacula com um hambuguer" width={50} height={50}/>
    <Link href="/favoriteRecipes"><Image src="/icons/coracao.png" alt="icone de coracao" width={20} height={20}/></Link>
    <Link href="/inProgress"><Image src="/icons/cozinhando.png" alt="icone de coracao" width={20} height={20}/></Link>
    </>
  )
}


