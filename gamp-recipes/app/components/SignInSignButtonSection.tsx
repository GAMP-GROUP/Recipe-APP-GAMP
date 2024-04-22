import React from 'react';
import GoogleSignInButton from './GoogleSignInButton';

type TSignInSignUpButtonSectionProps = {
    type: 'signin' | 'signup',
    handleClickBtn: () => void,
}

export default function SignInSignUpButtonSection({ type, handleClickBtn }: TSignInSignUpButtonSectionProps) {
	const isSignIn = type === 'signin';

	return (
		<section
			className='flex flex-col items-center gap-2'
		>
			<button
				type='button'
				onClick={ handleClickBtn }
				className={
					`w-80 bg-yellow border border-gray-300 rounded-lg shadow-md py-2
							text-sm font-bold text-gray-700 hover:bg-gray-200
							focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`
				}>
				{isSignIn ? 'LOGIN' : 'CREATE ACCOUNT'}
			</button>

			<section className='flex items-center h-10 w-11/12'>
				<div className='h-[0.05rem] w-4/6 bg-gray-300' />
				<p className='leading-none px-4 text-xs text-gray-600 tracking-wide font-medium'>
                    Or
				</p>
				<div className='h-[0.05rem] w-4/6 bg-gray-300' />
			</section>

			<GoogleSignInButton />
		</section>
	);
}