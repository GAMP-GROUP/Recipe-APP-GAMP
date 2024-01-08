import React from 'react';

export default function DesktopMenu() {
	return (
		<section
			className='col-span-3 hidden xl:flex order-last w-full h-10 bg-gray-200 justify-center'
		>
			<ul
				className='flex gap-12 items-center text-black underline font-bold'
			>
				<li>Home</li>
				<li>Meals</li>
				<li>Drinks</li>
				<li>Favorites</li>
				<li>Create</li>
			</ul>
		</section>
	);
}