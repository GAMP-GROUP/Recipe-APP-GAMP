import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import React from 'react';

type TNextSlideButtonProps = {
    nextSlideNumber: number,
}

export default function NextSlideButton({ nextSlideNumber }: TNextSlideButtonProps) {
	const { setCurrentSlide } = useBehaviorContext();

	return (
		<button
			className='w-full bg-black text-white rounded-xl py-2'
			onClick={ () => setCurrentSlide(nextSlideNumber) }
		>
            Next
		</button>
	);
}
