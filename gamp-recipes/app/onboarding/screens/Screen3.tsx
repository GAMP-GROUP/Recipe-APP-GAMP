import React from 'react';
import FinishOnboardingButton from '../components/FinishOnboardingButton';

export default function Screen3() {
	return (
		<section
			className='swiper-slide bg-yellow flex flex-col justify-center items-center relative text-center'
		>
			Fim
			<div className='flex flex-col w-11/12 gap-2 absolute bottom-20 font-bold'>
				<FinishOnboardingButton />
			</div>
		</section>
	);
}
