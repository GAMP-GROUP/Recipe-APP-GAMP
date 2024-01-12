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
		// <section
		// 	className='swiper-slide bg-yellow'
		// >
		// 	<h1>Unlock all content</h1>
		// 	<img src='/images/slide2.png'/>
		// 	<p>Sign up for <strong>free!</strong></p>
		// 	<div className='flex flex-col w-11/12 gap-2 absolute bottom-20 font-bold'>
		// 		<FinishOnboardingButton />
		// 		<button className='py-2'>Login</button>
		// 	</div>
		// </section>
	);
}
