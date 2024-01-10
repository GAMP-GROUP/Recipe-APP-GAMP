import React from 'react';
import ButtonSection from '../components/ButtonSection';

export default function Slide2() {
	return (
		<section
			className='swiper-slide bg-yellow '
		>
			<img src='/images/slide2.png' />
			<div className='pb-8'>
				<h1>No need for <br />magic tricks</h1>
				<p><span className='font-bold'>Follow</span> your favorite cooks, <span className='font-bold'>share</span> your favorite recipes and <span className='font-bold'>develop</span> your cooking skills</p>
			</div>

			<ButtonSection
				nextSlideNumber={2}
			/>
		</section>
	);
}
