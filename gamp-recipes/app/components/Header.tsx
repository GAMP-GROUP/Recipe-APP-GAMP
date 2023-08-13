'use client';
import Image from "@/node_modules/next/image";

export default function Header() {
    const navLinks = ['Home', 'Meals', 'Drinks', 'Favorites'];

    function searchClick(element: any): void {
        console.log(element);
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
                src='/images/logo-black.png'
                width='125'
                height='125'
                alt='Our logo'
            />
            <span
                className="bg-black p-2 rounded-full"
                onClick={ ({ target }) => searchClick(target) }
            >
                <Image
                    src='/icons/search-yellow.png'
                    width='25'
                    height='25'
                    alt='A magnifiyng glass vectorized, representing the search icon'
                />
            </span>
        </header>
    )
}
