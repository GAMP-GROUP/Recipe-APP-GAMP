import React from 'react';
import SignUpForm from '@/app/components/SignUpForm';

function SingUp() {
	return (
		<div className='z-3 h-screen w-screen bg-white relative'>
			<div className='z-1 flex flex-col gap-4 w-full h-full bg-white absolute top-0 left-0 right-0 bottom-0'>
				<SignUpForm />
			</div>
		</div>
	);
}

export default SingUp;
