import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GampLogo() {
	return (
		<Link
			href='/'
			className={ 'xl:order-first' }
		>
			<Image
				src={'/images/logo-simple.png'}
				width={60}
				height={60}
				alt='logo'
			/>
		</Link>
	);
}