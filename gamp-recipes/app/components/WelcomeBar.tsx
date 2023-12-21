import React from 'react';

export default function WelcomeBar() {
	return (
		<section
			className='xl:hidden pt-8 flex-col justify-between items-center relative'
		>
			<h1>Hello, Mario</h1>
			<h4 className='text-gray-400 font-medium'>What would you like to cook?</h4>
			<img src='/icons/notification.svg' alt="" className='absolute top-8 right-2 rounded-full bg-yellow p-2 w-[2.5em] h-[2.5em]' />
		</section>
	);
}
