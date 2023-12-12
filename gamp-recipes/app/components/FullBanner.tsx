import React from 'react';
import Link from 'next/link';

export default function FullBanner() {
	return (
		<section
			className='hidden xl:w-screen xl:h-80 xl:bg-black xl:flex xl:justify-center xl:items-center'
		>
			<Link
				href='/33'
			>
				<picture>
					<img src='/images/fullbanner.jpg' alt='Full banner showing the recipe of the week.' />
				</picture>
			</Link>
		</section>
	);
}
