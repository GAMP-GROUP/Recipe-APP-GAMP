import React from 'react';
import NextSlideButton from '../components/NextSlideButton';
import SkipOnboardingButton from '../components/SkipOnboardingButton';

type TButtonSectionProps = {
    nextSlideNumber: number,
}

export default function ButtonSection({ nextSlideNumber }: TButtonSectionProps) {
	return (
		<section
			className='flex flex-col w-11/12 gap-2 absolute bottom-8 font-bold'
		>
			<NextSlideButton
				nextSlideNumber={ nextSlideNumber }
			/>
			<SkipOnboardingButton />
		</section>

	);
}