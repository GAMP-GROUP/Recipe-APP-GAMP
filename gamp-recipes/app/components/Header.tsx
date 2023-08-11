export default function Header() {
    const navLinks = ['Home', 'Meals', 'Drinks', 'Favorites'];

    return (
        <header
            className="w-full h-32 bg-brown text-yellow"
        >
            <h1>Gamp</h1>
            <nav className="flex row">
                { navLinks.map((menuItem) => (
                    <li className="list-none mx-2">{ menuItem }</li>
                )) }
            </nav>
        </header>
    )
}
