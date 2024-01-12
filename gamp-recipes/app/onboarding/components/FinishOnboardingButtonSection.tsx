import React from 'react';
import CreateAccountOnboardingButton from './CreateAccountOnboardingButton';
import LoginOnboardingButton from './LoginOnboardingButton';

export default function FinishOnboardingButtonSection() {

	return (
		<section
			className='flex flex-col w-11/12 gap-2 absolute bottom-8 font-bold'
		>
			<CreateAccountOnboardingButton />
			<LoginOnboardingButton />
		</section>
	);
}
