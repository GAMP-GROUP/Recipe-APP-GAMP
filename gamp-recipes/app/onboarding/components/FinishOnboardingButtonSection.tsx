import React from 'react';
import Link from 'next/link';

export default function FinishOnboardingButtonSection() {

	return (
		<section
			className='flex flex-col w-11/12 gap-2 absolute bottom-8 font-bold'
		>
			<Link
				href='http://localhost:3000/auth/signup'
			>
				<button
					className='w-full bg-black text-white rounded-xl py-2'
				>
					Create account
				</button>
			</Link>
			<Link
				href='http://localhost:3000/auth/signin'
			>
				<button className='py-2'>
					Login
				</button>
			</Link>
		</section>
	);
}
