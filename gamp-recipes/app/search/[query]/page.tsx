type searchProps = {
    params: { query: string }
}

export default function SearchFeed({ params: { query } }: searchProps) {
    return(
        <main>
            <header>
                <input type="text" />
            </header>
            <h1>
                { query }
            </h1>
        </main>
    )
}