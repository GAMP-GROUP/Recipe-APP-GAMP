import React from 'react';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';

type TSwiperWrapperProps = {
	currentSlide: number,
}

export default function SwiperWrapper({ currentSlide }: TSwiperWrapperProps) {
	
	return (
		<section id='swiper-container'>
			<section id='swiper-wrapper' style={{ transform: `translateX(-${currentSlide * 100}%)` }} className='flex'>
				<Screen1 />
				<Screen2 />
				<Screen3 />
			</section>
		</section>
	);
}
