'use client';
import { useState } from "react";
import Image from "@/node_modules/next/image";

export default function Header() {
    const [searchStatus, setSearchStatus] = useState(false);

    function searchClick(): void {
        const searchTextInput = document.getElementById('search-input');

        if (searchTextInput) {
            const hiddenStatus = searchTextInput.hidden;
            searchTextInput.hidden = !hiddenStatus;
        }

        setSearchStatus(!searchStatus);
    }

    return (
        <header
            className="w-full h-24 p-4 bg-yellow flex justify-between items-center"
        >
            <Image
                src='/icons/menu.png'
                width='35'
                height='35'
                alt='Three stripes positioned horizontally one above the other, representing the menu icon'
            />
            <Image
                id='gamp-logo'
                width='125'
                height='125'
                src='/images/logo-black.png'
                className={`transition-width ${!searchStatus ? 'w-125' : 'w-100'}`}
                alt='Our logo'
            />
            <span
                id='search-element'
                className='bg-black p-3 rounded-full flex justify-between'
                onClick={ () => searchClick() }
            >
                <input
                    id='search-input'
                    className='w-28 bg-black text-white'
                    type='text'
                    placeholder='Recipe'
                    hidden={ true }
                />
                <Image
                    src='/icons/search-yellow.png'
                    width='25'
                    height='25'
                    alt='A magnifiyng glass vectorized, representing the search icon'
                    className='place-content-end'
                />
            </span>
        </header>
    )
}
