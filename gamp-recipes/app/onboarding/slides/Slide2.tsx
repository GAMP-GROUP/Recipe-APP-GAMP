import React from 'react';
import ButtonSection from '../components/ButtonSection';
import SlideTitle from '../components/SlideTitle';

export default function Slide2() {
	return (
		<section
			className='swiper-slide'
		>
			<SlideTitle text='No need for magic tricks' />
			<img src='/images/slide2.png'/>
			<div className='pb-8'>
				<p><span className='font-bold'>Discover</span> your favorite recipes and</p>
				<p>develop your cooking <span className='italic'>(and mixing)</span> skills</p>
			</div>
			<ButtonSection
				nextSlideNumber={2}
			/>
		</section>
	);
}
