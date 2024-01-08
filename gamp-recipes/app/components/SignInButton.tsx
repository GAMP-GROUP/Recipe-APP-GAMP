import React from 'react';
import Link from 'next/link';

export default function SignInButton() {
	return (
		<Link href='/auth/signin' className='self-center place-self-end' >
			<button className='text-sm font-semibold px-4 py-1 bg-black text-white rounded-2xl'>
            Sign In
			</button>
		</Link>
	);
}