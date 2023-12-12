'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FullBanner() {
	const [bannerIndex, setBannerIndex] = useState(0);
	const bannersList = [
		{
			src: '/images/fullbanner.jpg',
			href: '/33'
		},
		{
			src: '/images/fullbanner2.jpg',
			href: '/49'
		},
	];

	function previousBanner(): void {
		const isFirstBanner = bannerIndex === 0;
		const newIndex = isFirstBanner ? bannersList.length - 1 : bannerIndex - 1;
		setBannerIndex(newIndex);
	}

	function nextBanner(): void {
		const isLastBanner = bannerIndex === bannersList.length - 1;
		const newIndex = isLastBanner ? 0 : bannerIndex + 1;
		setBannerIndex(newIndex);
	}

	return (
		<section
			className='hidden xl:relative xl:w-screen xl:h-80 xl:bg-black xl:flex xl:justify-center xl:items-center xl:duration-500'
			// Renderiza o carrosel de imagens
		>
			<Link
				href={ bannersList[bannerIndex].href }
			>
				<Image
					src={ bannersList[bannerIndex].src }
					alt='Full Banner image'
					width={ 1280 }
					height={ 320 }
					className='transition-transform duration-500'
				/>
			</Link>
			<button
				id='fullbanner-left-arrow'
				onClick={ previousBanner }
				className='absolute invert left-0 opacity-30 hover:opacity-100 transition-opacity duration-200'
				// Botão para navegar para o banner anterior
			>
				<Image
					src='/icons/arrow-left.svg'
					width={ 50 }
					height={ 50 }
					alt='Left arrow'
				/>
			</button>
			<button
				id='fullbanner-right-arrow'
				onClick={ nextBanner }
				className='absolute invert right-4 opacity-30 hover:opacity-100 transition-opacity duration-200'
				// Botão para navegar para o próximo banner
			>
				<Image
					src='/icons/arrow-right.svg'
					width={ 50 }
					height={ 50 }
					alt='Right arrow'
				/>
			</button>
			{/* <div
				id="fullbanner-select-buttons"
				className='absolute bottom-4 z-50 text-white'
			>
				{
					bannersList.map((_banner, index) => (
						<button
							key={ index }
						>
							o
						</button>
					))
				}
			</div> */}
		</section>
	);
}
