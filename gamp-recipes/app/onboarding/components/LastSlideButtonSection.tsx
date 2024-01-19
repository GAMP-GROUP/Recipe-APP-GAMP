import React from 'react';
import CreateAccountOnboardingButton from './CreateAccountButton';
import LoginButton from './LoginButton';

export default function LastSlideButtonSection() {

	return (
		<section
			className='flex flex-col w-11/12 gap-2 absolute bottom-8 font-bold'
		>
			<CreateAccountOnboardingButton />
			<LoginButton />
		</section>
	);
}
