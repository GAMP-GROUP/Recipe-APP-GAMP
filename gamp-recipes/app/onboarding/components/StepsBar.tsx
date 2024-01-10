import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import React from 'react';

export default function StepsBar() {
	const { currentSlide } = useBehaviorContext();
	const checkedStepClass = 'w-1/3 h-1 bg-black transition-colors duration-500';
	const uncheckedStepClass = 'w-1/3 h-1 bg-white transition-colors duration-500';

	return (
		<section
			className='w-11/12 z-10 flex gap-2 absolute top-10 left-1/2 -translate-x-1/2'
		>
			<div
				className={ checkedStepClass }
			/>
			<div
				className={ currentSlide > 0 ? checkedStepClass : uncheckedStepClass }
			/>
			<div
				className={ currentSlide > 1 ? checkedStepClass : uncheckedStepClass }
			/>
		</section>
	);
}