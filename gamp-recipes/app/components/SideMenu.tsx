import { useBehaviorContext } from "@/contextAPI/context/behavior.context";
import { Dispatch, SetStateAction } from "react";

export function toggleMenu(menu: boolean, setMenu: Dispatch<SetStateAction<boolean>>) {
    const body = document.querySelector('body');
    setMenu(!menu);
    menu === false ? body!.classList.add('overflow-hidden') : body!.classList.remove('overflow-hidden');
}

export default function SideMenu() {
    const { menu, setMenu } = useBehaviorContext();
    const menuItems = ['Sign Up', 'Meals', 'Drinks', 'Profile']

    return (
        <main className={ `w-screen absolute top-0
        ${ menu ? 'translate-x-0' : '-translate-x-full' }
        transition-transform ease-in-out duration-300 flex` }>
            <nav
                className={`h-screen w-3/6 bg-stone-800 `}
            >
                    <ul className="text-white flex-row w-full">
                        { menuItems.map((item, index) => (
                            <li
                                key={ index }
                                className='flex-1 py-4 pl-4 w-full text-xl font-bold'>
                                    { item }
                            </li>
                        ))}
                    </ul>
            </nav>
            <aside
                className={ `h-screen w-3/6 }` }
                onClick={ () => toggleMenu(menu, setMenu) }
            >
            </aside>
        </main>
    )
}
