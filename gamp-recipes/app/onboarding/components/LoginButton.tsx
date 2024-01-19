import React from 'react';
import Link from 'next/link';

export default function LoginButton() {
	return (
		<Link
			href='http://localhost:3000/auth/signin'
		>
			<button className='py-2 text-base'>
				Login
			</button>
		</Link>
	);
}
