'use client'
import {
    useState,
    useContext,
    createContext,
    Dispatch,
    SetStateAction,
    ReactNode,
} from "react";

type Props = {
    children: ReactNode,
}

type BehaviorProps = {
    menu: boolean,
    setMenu: Dispatch<SetStateAction<boolean>>,
    searchBar: boolean,
    setSearchBar: Dispatch<SetStateAction<boolean>>,
}

export const BehaviorContext = createContext({
    menu: false,
    setMenu: () => {},
    searchBar: false,
    setSearchBar: () => {},
} as BehaviorProps)

export function BehaviorProvider({ children } : Props) {
    const [menu, setMenu] = useState(false);
    const [searchBar, setSearchBar] = useState(false);

    const behaviorSettings = {
        menu,
        setMenu,
        searchBar,
        setSearchBar,
    }

    return (
        <BehaviorContext.Provider value={ behaviorSettings }>
            { children }
        </BehaviorContext.Provider>
    )
}

export function useBehaviorContext() {
    return useContext(BehaviorContext);
}
