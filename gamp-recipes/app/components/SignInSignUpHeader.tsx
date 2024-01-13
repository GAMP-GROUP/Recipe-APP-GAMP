import React from 'react';

type TSignInSignUpHeaderProps = {
	type: 'signin' | 'signup';
};

export default function SignInSignUpHeader({ type }: TSignInSignUpHeaderProps) {
	const isSignIn = type === 'signin';

	return (
		<section className='flex flex-col items-center'>
			<img src='/images/logo-black.png' alt='logo icon' className='w-32' />
			<h2 className='text-center text-2xl font-bold text-gray-900 py-2'>
				{isSignIn ? 'Sign In' : 'Sign Up'}
			</h2>

			<p className="text-center text-sm text-gray-500">
				{isSignIn ? 'Don\'t have an account yet?' : 'Already registered?'}
				<a
					href={isSignIn ? '/auth/signin' : '/auth/signup'}
					className=" mt-2 font-semibold text-gray-700 focus:text-gray-800 focus:outline-none"
				>
					{isSignIn ? ' Register here.' : ' Login here.'}
				</a>
			</p>
		</section>
	);
}
