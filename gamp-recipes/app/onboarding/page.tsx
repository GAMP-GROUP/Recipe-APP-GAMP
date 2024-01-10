'use client';
import React from 'react';
import SwiperWrapper from './components/SwipperWrapper';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';
import StepsBar from './components/StepsBar';

export default function Onboarding() {
	const { currentSlide } = useBehaviorContext();
	
	return (
		<main className='h-screen w-screen overflow-hidden'>
			<StepsBar />
			<SwiperWrapper
				currentSlide={ currentSlide }
			/>
		</main>
	);
}
