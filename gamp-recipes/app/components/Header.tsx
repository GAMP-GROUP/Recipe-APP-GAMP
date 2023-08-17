'use client';
import { useState, useEffect } from "react";
import Image from "@/node_modules/next/image";
import { useBehaviorContext } from "@/contextAPI/context/behavior.context";
import { toggleMenu } from "./SideMenu";

export default function Header() {
    const [searchStatus, setSearchStatus] = useState(false);
    const [userScroll, setUserScroll] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    
    const { menu, setMenu } = useBehaviorContext();

    function searchClick(): void {
        const searchTextInput = document.getElementById('search-input');

        if (searchTextInput) {
            const hiddenStatus = searchTextInput.hidden;
            searchTextInput.hidden = !hiddenStatus;
        }

        setSearchStatus(!searchStatus);
    }

    function scrollPage(): void {
        const currentScrollY = window.scrollY;
        const showHeader = scrollPosition > currentScrollY;

        setUserScroll(showHeader);
        setScrollPosition(currentScrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollPage);
        return () => {
            window.removeEventListener('scroll', scrollPage);
        }
    }, [scrollPosition]);

    return (
        <header
            id="header"
            className={ `w-full h-24 p-4 bg-yellow flex justify-between items-center sticky top-0 transition-transform duration-300
            ${ userScroll ? 'transform translate-y-0' : '-translate-y-full' }` }
        >
            <Image
                src='/icons/menu.png'
                width='32'
                height='32'
                alt='Three stripes positioned horizontally one above the other, representing the menu icon'
                onClick={ () => toggleMenu(menu, setMenu) }
            />
            <picture>
                <img
                    id='gamp-logo'
                    className={ `transition-all duration-300 ${ !searchStatus ? 'w-big' : 'w-small' }` }
                    src='/images/logo-color.png'
                    alt='Our logo'
                />
            </picture>
            <span
                id='search-element'
                className={ `bg-black p-3 rounded-full flex justify-between transition-all duration-300 ${ !searchStatus ? 'w-12' : 'w-56' }`}
            >
                <input
                    id='search-input'
                    className='w-40 bg-black text-white'
                    type='text'
                    placeholder='Recipe or ingredient'
                    hidden={ true }
                />
                <Image
                    src='/icons/search-yellow.png'
                    width='25'
                    height='25'
                    alt='A magnifiyng glass vectorized, representing the search icon'
                    className='place-content-end'
                    onClick={ () => searchClick() }
                />
            </span>
        </header>
    )
}
