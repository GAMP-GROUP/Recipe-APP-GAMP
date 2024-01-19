import React from 'react';
import Link from 'next/link';

type TSkipOnboardingButtonProps = {
	currentSlide: number,
}

export default function SkipOnboardingButton({ currentSlide }: TSkipOnboardingButtonProps) {
	return (
		<Link href='/'>
			<button
				className={`z-10 py-2 absolute right-8 top-16 font-bold ${ currentSlide === 2 ? 'text-white transition-colors duration-[2000ms]' : '' }`}
			>
				Skip
			</button>
		</Link>
	);
}
