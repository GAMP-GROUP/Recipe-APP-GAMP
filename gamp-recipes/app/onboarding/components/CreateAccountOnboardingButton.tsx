import React from 'react';
import Link from 'next/link';

export default function CreateAccountOnboardingButton() {
	return (
		<Link
			href='http://localhost:3000/auth/signup'
		>
			<button
				className='w-full bg-black text-white rounded-xl py-2'
			>
            Create account
			</button>
		</Link>
	);
}
