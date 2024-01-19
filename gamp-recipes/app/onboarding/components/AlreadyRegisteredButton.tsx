import React from 'react';
import Link from 'next/link';

export default function AlreadyRegisteredButton() {
	return (
		<Link
			href='http://localhost:3000/auth/signin'
		>
			<button className='py-2 text-base font-medium'>
                Already have an account? <span className='underline font-bold'>Sign In</span>
			</button>
		</Link>

	);
}