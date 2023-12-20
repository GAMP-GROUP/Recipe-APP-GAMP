'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FullBanner() {
	const [bannerIndex, setBannerIndex] = useState(0);
	const [timerId, setTimerId] = useState<number | NodeJS.Timeout | null>(null);
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

	// Muda o banner renderizado para o anterior
	function previousBanner(): void {
		const isFirstBanner = bannerIndex === 0;
		const newIndex = isFirstBanner ? bannersList.length - 1 : bannerIndex - 1;
		setBannerIndex(newIndex);
	}

	// Seleciona o próximo banner do array para renderizar na tela
	function nextBanner(): void {
		const isLastBanner = bannerIndex === bannersList.length - 1;
		const newIndex = isLastBanner ? 0 : bannerIndex + 1;
		setBannerIndex(newIndex);
	}

	// Inicia a contagem para mudança de banner automaticamente
	function startTimer() {
		const newTimerId = setInterval(() => {
			nextBanner();
		}, 5000);
		setTimerId(newTimerId);
	}
		
	useEffect(() => {
		// Inicia o contador para mudar o banner automaticamente
		startTimer();
	
		return () => {
			// Limpa o contador quando o componente é desmontado
			// a fim  de evitar vazamento de memória
			if (timerId) {
				clearInterval(timerId as NodeJS.Timeout);
			}
		};
	}, [bannerIndex]);
	

	return (
		<section
			className='hidden xl:relative xl:w-screen xl:h-80 xl:bg-black xl:flex xl:justify-center xl:items-center xl:duration-500'
			// Renderiza o carrosel de imagens
		>
			<Link
				// Link para a receita mostrada no banner
				href={ bannersList[bannerIndex].href }
			>
				<Image
					// Extrai o endereço do banner no array e renderiza
					src={ bannersList[bannerIndex].src }
					alt='Full Banner image'
					width={ 1280 }
					height={ 320 }
					className='transition-transform duration-500'
				/>
			</Link>
			<button
				// Botão para navegar para o banner anterior
				id='fullbanner-left-arrow'
				onClick={ previousBanner }
				className='absolute invert left-0 opacity-30 hover:opacity-100 transition-opacity duration-200'
			>
				<Image
					// Ícone do botão para a esquerda
					src='/icons/arrow-left.svg'
					width={ 50 }
					height={ 50 }
					alt='Left arrow'
				/>
			</button>
			<button
				// Botão para navegar para o próximo banner
				id='fullbanner-right-arrow'
				onClick={ nextBanner }
				className='absolute invert right-4 opacity-30 hover:opacity-100 transition-opacity duration-200'
			>
				<Image
					// Ícone do botão para a direita
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
