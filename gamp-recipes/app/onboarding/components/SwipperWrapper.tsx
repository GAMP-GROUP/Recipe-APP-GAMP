import React from 'react';
import SkipOnboardingButton from './SkipOnboardingButton';
import Slide1 from '../slides/Slide1';
import Slide2 from '../slides/Slide2';
import Slide3 from '../slides/Slide3';

type TSwiperWrapperProps = {
	currentSlide: number,
}

export default function SwiperWrapper({ currentSlide }: TSwiperWrapperProps) {

	return (
		<section id='swiper-container' className={ currentSlide < 2 ? 'bg-yellow' : 'bg-black transition-colors duration-[2000ms] relative' }>
			<SkipOnboardingButton currentSlide={ currentSlide } />
			<section id='swiper-wrapper' style={{ transform: `translateX(-${currentSlide * 100}%)` }} className='flex'>
				<Slide1 />
				<Slide2 />
				<Slide3 />
			</section>
		</section>
	);
}
