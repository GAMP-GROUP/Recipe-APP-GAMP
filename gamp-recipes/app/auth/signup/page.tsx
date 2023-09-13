import React from 'react';
import SignUpForm from '@/app/components/SignUpForm';

function SingUp() {
	return (
		<div className='z-3 h-screen w-screen bg-white'>
			<div className='flex flex-col gap-4 w-full h-full bg-white'>
				<SignUpForm />
			</div>
		</div>
	);
}

export default SingUp;
