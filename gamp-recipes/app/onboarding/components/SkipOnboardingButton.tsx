import React from 'react';
import Link from 'next/link';

export default function SkipOnboardingButton() {
	return (
		<Link href='/'>
			<button
				className='py-2 text-base'
			>
				Skip
			</button>
		</Link>
	);
}
