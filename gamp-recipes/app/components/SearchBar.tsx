'use client'
import '../custom-styles.css'
import { useBehaviorContext } from "@/contextAPI/context/behavior.context";
import Image from "@/node_modules/next/image";

export default function SearchBar() {
    const { searchBar, setSearchBar } = useBehaviorContext();

    return (
        <section
            id='searchBar'
            className='z-[99] relative'
            hidden={ searchBar === true ? false : true }>
            {/* A tela toda */}
            <section
                className={`w-screen h-16 fixed top-0 bg-white py-3 px-6 flex justify-between items-center`}
            > {/* O container branco */}
                <fieldset className='w-11/12 bg-gray-200 rounded-xl py-1 mr-3 self-center flex justify-between place-items-center'>
                    <input type="text" placeholder="Recipe or ingredient"
                        className="bg-gray-200 ml-3"
                    /> {/* O campo para inserir o termo de pesquisa */}
                    <button className="mr-3">
                        <Image
                            src='/icons/search.png'
                            width={15}
                            height={15}
                            alt='Search icon'
                        /> {/* Icone de pesquisa */}
                    </button> {/* Botão para fazer a pesquisa */}
                </fieldset> {/* Todo container que abrange o campo input mais o botão */}
                    <button onClick={ () => setSearchBar(false) }>
                        <picture>
                            <img
                                src='/icons/close-white.png'
                                alt='Close icon'
                                className='bg-gray-800 rounded-full p-1 w-5'
                            /> {/* Botão para fechar a barra de pesquisa */}
                        </picture>
                    </button>
            </section>
            { searchBar &&
            <div
                className="overlay"
                onClick={() => setSearchBar(false)}
            /> } {/* Resto da tela além da barra de pesquisa */}
        </section>
    )
}