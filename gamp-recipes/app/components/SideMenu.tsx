import { useBehaviorContext } from "@/contextAPI/context/behavior.context";
import { Dispatch, SetStateAction } from "react";

export function toggleMenu(menu: boolean, setMenu: Dispatch<SetStateAction<boolean>>) {
    const body = document.querySelector('body');
    setMenu(!menu);
    menu === false ? body!.classList.add('overflow-hidden') : body!.classList.remove('overflow-hidden');
}

export default function SideMenu() {
    const { menu, setMenu } = useBehaviorContext();
    const menuItems = ['Login', 'Meals', 'Drinks', 'Favorites']

    return (
        <main id='menu-screen' className={ `w-screen absolute top-0
        ${ menu ? 'translate-x-0' : '-translate-x-full' }
        transition-transform ease-in-out duration-300 flex` }>
            <nav
                id='menu'
                className={`h-screen w-4/6 bg-stone-800 text-white`}
            >
                    <ul className="flex-row w-full">
                        { menuItems.map((item, index) => (
                            <li
                                key={ index }
                                className={ `flex-1 py-4 pl-4 w-full text-xl font-bold ${ index === 0 ? 'text-yellow bg-black uppercase font-extrabold' : 'font-medium' } flex items-center` }>
                                    <picture>
                                        <img
                                            src={ `/icons/${item.toLowerCase()}.png` }
                                            alt={ `${item} icon` }
                                            className="w-6 mr-4"
                                        />
                                    </picture>
                                    { item }
                                    <hr />
                            </li>
                        ))}
                    </ul>
            </nav>
            <aside
                id='outside-menu'
                className='h-screen w-2/6'
                onClick={ () => toggleMenu(menu, setMenu) }
            >
            </aside>
        </main>
    )
}
