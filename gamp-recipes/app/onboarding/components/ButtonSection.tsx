import React from 'react';
import NextSlideButton from '../components/NextSlideButton';
import AlreadyRegisteredButton from './AlreadyRegisteredButton';

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
			<AlreadyRegisteredButton />
		</section>

	);
}