import Image from "@/node_modules/next/image"

export default function Footer() {
    const siteMap = ['About us', 'Advertise', 'Contact us', 'Cookie policy', 'Privacy policy'];
    const externalLinks = ['Facebook', 'Instagram', 'YouTube', 'Pinterest', 'Twitter']

    return (
        <footer className='pb-6 px-6 w-full mx-auto bg-yellow text-center'>
            <section className='mb-6 font-normal'>
                <Image
                    src='/images/logo-black.png'
                    width='155'
                    height='155'
                    alt='Gamp logo in black lines only'
                    className='mx-auto'
                />
                <p className='text-sm'>
                    Whether you are an experienced chef or just starting your culinary journey,
                    Gamp offers a delightful array of recipes for both meals and beverages.
                    As your digital culinary companion, Gamp presents a treasure trove of global recipes,
                    aiding you in discovering, saving, and organizing your favorite creations.
                </p>
            </section>
            <hr className="my-4 border-t-2 border-black" />
            <section>
                <span className='font-bold text-lg'>Follow us</span>
                <div className='flex justify-evenly my-4 px-6'>
                    { externalLinks.map((link, index) => (
                        <Image
                            src={ `/icons/${link.toLowerCase()}.png` }
                            key={ index } width='40' height='40' alt={ `${link} icon` } />
                        ))
                    }
                </div>
            </section>
            <section className='flex flex-wrap px-12 justify-center'>
                { siteMap.map((navItem, index) => (
                    <p className='w-28 font-medium' key={ index }>{ navItem }</p>
                ))}
            </section>
            {/* <ul className='flex flex-col justify-between h-full'>
                { siteMap.map((navItem, index) => (
                    <li
                        key={ index }
                        className='flex-grow font-medium'
                    >
                        { navItem }
                    </li>
                )) }
            </ul> */}
        </footer>
    )
}