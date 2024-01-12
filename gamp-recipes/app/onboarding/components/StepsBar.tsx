import React from 'react';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';

type TStepId = 'step-bar-1' | 'step-bar-2' | 'step-bar-3';

export default function StepsBar() {
	const { currentSlide } = useBehaviorContext();
	const checkedStepClass = 'w-1/3 h-1 bg-black transition-colors duration-1000';
	const uncheckedStepClass = 'w-1/3 h-1 bg-white transition-colors duration-1000';
	const lastStepClass = 'w-1/3 h-1 bg-yellow transition-colors duration-1000';
	const firstStepCheckedClass = 'w-1/3 h-1 bg-black';
	const firstStepUncheckedClass = 'w-1/3 h-1 bg-white';

	function stepCheckClass(id: TStepId) {
		if (currentSlide === 0) {
			switch (id) {
			case 'step-bar-1':
				return firstStepCheckedClass;
			case 'step-bar-2':
				return firstStepUncheckedClass;
			case 'step-bar-3':
				return firstStepUncheckedClass;
			default:
				return checkedStepClass;
			}
		}

		if (currentSlide === 2) {
			return lastStepClass;
		}

		switch (id) {
		case 'step-bar-1':
			return checkedStepClass;
		case 'step-bar-2':
			return currentSlide > 0 ? checkedStepClass : uncheckedStepClass;
		case 'step-bar-3':
			return uncheckedStepClass;
		default:
			return checkedStepClass;
		}
	}

	return (
		<section
			className='w-11/12 z-10 flex gap-2 absolute top-10 left-1/2 -translate-x-1/2'
		>
			{ ['step-bar-1', 'step-bar-2', 'step-bar-3'].map((id, index) => (
				<div
					key={ index } id={ id } className={ stepCheckClass(id as TStepId) }
				/>
			)) }
		</section>
	);
}
