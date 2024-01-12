import React from 'react';
import ButtonSection from '../components/ButtonSection';

export default function Slide1() {
	return (
		<section
			className='swiper-slide'
		>
			<h1>Welcome!</h1>
			<img src='/images/slide1.png' />
			<div className='pb-8'>
				<p>Let&apos;s get ready to chop some onions and start <span className='line-through'>crying</span> <span className='font-bold'>cooking!</span></p>
			</div>
			<ButtonSection
				nextSlideNumber={1}
			/>
		</section>
	);
}
