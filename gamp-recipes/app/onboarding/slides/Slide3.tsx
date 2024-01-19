import React from 'react';
import SlideTitle from '../components/SlideTitle';
import FinishOnboardingButtonSection from '../components/LastSlideButtonSection';

export default function Slide3() {

	return (
		<section
			className='swiper-slide text-white'
		>
			<SlideTitle text='Unlock all content' />
			<img src='/images/slide3.png' className='invert'/>
			<div className='pb-8 flex-col'>
				<p>Sign up now</p>
				<p><span className='text-3xl font-bold leading-tight'>for free</span></p>
			</div>
			<FinishOnboardingButtonSection />
		</section>
	);
}
