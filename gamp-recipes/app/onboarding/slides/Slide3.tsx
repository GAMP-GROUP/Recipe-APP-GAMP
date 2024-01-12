import React from 'react';
import FinishOnboardingButtonSection from '../components/FinishOnboardingButtonSection';

export default function Slide3() {

	return (
		<section
			className='swiper-slide text-white'
		>
			<h1>Unlock all content</h1>
			<img src='/images/slide3.png' className='invert'/>
			<div className='pb-8 flex-col'>
				<p>Sign up now</p>
				<p><span className='text-[3rem] font-bold leading-tight'>it&apos;s free</span></p>
			</div>
			<FinishOnboardingButtonSection />
		</section>
	);
}
