import React from 'react';
import Link from 'next/link';

export default function NextSlideButton() {

	return (
		<Link href='/'>
			<button
				className='w-full bg-black text-white rounded-xl py-2'
			>
                Let&apos;s Start
			</button>
		</Link>
	);
}
