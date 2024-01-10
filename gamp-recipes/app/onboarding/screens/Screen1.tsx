import React from 'react';
import ButtonSection from '../components/ButtonSection';

export default function Screen1() {

	return (
		<section
			className='swiper-slide bg-yellow flex flex-col justify-center items-center relative text-center'
		>
			<img src='/images/logo-bw.png' className='w-60' alt='' />
			<h1>Welcome</h1>
			<p>Get ready to grab your ingredients and start cooking</p>
			<ButtonSection
				nextSlideNumber={1}
			/>
		</section>
	);
}
