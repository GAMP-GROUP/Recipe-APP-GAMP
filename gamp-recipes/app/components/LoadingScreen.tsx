import React from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
	const loadingMessages = [
		'Texting our kitchen wizards...', 'Chopping, dicing, and loading...', 'Stirring up some digital delights...',
		'Brewing a feed of recipes...', 'Seasoning the digital pot...'
	];

	function randomLoadingMessage(loadingMessagesArray: string[]): string {
		const randomMessageIndex = Math.floor(Math.random() * loadingMessagesArray.length);
		const randomMessage = loadingMessages[randomMessageIndex];
		return randomMessage;
	}

	return (
		<section className='h-[600px] w-screen flex flex-col justify-center items-center'>
			<Image
				src='/images/logo-simple.png'
				width={ 50 }
				height={ 50 }
				alt='Loading Gamp logo'
				className='animate-loading'
			/>
			<h1 className='animate-loading text-center font-extrabold text-lg'>
				{ randomLoadingMessage(loadingMessages) }
			</h1>
		</section>

	);
}