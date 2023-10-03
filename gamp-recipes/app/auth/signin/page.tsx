import React from 'react';
import SignInForm from '@/app/components/SignInForm';

function SingIn() {
	return (
		<div className='z-3 h-full w-full bg-white'>
			<div className='z-1 flex flex-col gap-4 w-full h-full bg-white absolute top-0 left-0 right-0 bottom-0 items-center justify-center'>
				<SignInForm />
			</div>
		</div>
	);
}

export default SingIn;
