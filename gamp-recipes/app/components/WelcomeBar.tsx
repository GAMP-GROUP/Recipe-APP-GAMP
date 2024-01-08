import React from 'react';
import NotificationBell from './NotificationBell';

export default function WelcomeBar() {
	return (
		<section
			className='xl:hidden pt-8 flex-col justify-between items-center relative'
		>
			<h1>Hello, Mario</h1>
			<h4 className='text-gray-400 font-medium'>What would you like to cook?</h4>
			<NotificationBell />
		</section>
	);
}
