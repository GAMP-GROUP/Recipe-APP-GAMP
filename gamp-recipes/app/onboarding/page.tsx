'use client';
import React, { useEffect, useCallback } from 'react';
import SwiperWrapper from './SwipperWrapper';
import { useBehaviorContext } from '@/contextAPI/context/behavior.context';

export default function Onboarding() {
	const { currentSlide, setCurrentSlide } = useBehaviorContext();
	const totalSlides = 3;

	const handleWheel = useCallback(
		(event: WheelEvent) => {
			// Valor que identifica se o scroll é para esquerda ou para direita
			const delta = event.deltaY;
	
			// Função que atualiza o status global da tela de onboarding de acordo com o scroll
			setCurrentSlide((prevSlide) => {
				if (delta > 0) {
					return Math.min(prevSlide + 1, totalSlides - 1);
				} else if (delta < 0) {
					return Math.max(prevSlide - 1, 0);
				}
				return prevSlide;
			});
		}, [totalSlides]
	);

	const debouncedHandleWheel = useCallback(
		(event: WheelEvent) => {
			// Verifica e previne scrollagem rápida
			if (!isScrolling) {
				isScrolling = true;

				handleWheel(event);

				setTimeout(() => {
					isScrolling = false;
				}, 1000);
			}
		}, [handleWheel]
	);

	let isScrolling = false;

	useEffect(() => {
		// Add the mouse wheel scroll event listener when the component is mounted
		document.addEventListener('wheel', debouncedHandleWheel);

		// Remove the event listener when the component is unmounted
		return () => {
			document.removeEventListener('wheel', debouncedHandleWheel);
		};
	}, [currentSlide]
	);

	return (
		<main className='h-screen w-screen overflow-y-hidden'>
			<SwiperWrapper
				currentSlide={ currentSlide }
			/>
		</main>
	);
}
