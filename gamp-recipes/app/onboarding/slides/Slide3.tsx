import React from 'react';
import FinishOnboardingButtonSection from '../components/FinishOnboardingButtonSection';
export default function Slide3() {
	return (
		<section
			className='swiper-slide bg-yellow '
		>
			<h1>Unlock all content</h1>
			<img src='/images/slide2.png'/>
			<div className='pb-8'>
				<p>Sign up now for</p>
				<p><span className='text-3xl font-bold'>free</span></p>
			</div>
			<FinishOnboardingButtonSection />
		</section>
	);
}
