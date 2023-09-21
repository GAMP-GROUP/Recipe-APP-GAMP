'use client';

import { UserContext } from '@/contextAPI/context';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import React from 'react';

export default function SignInForm() {
	const router = useRouter();

	const { status } = useSession();
	console.log('🚀 ~ file: SignInForm.tsx:14 ~ SignInForm ~ status:', status);

	const {
		handleInputChange,
		user: { email, password },
	} = useContext(UserContext);

	const handleSignUpBtn = async () => {
		try {
			const signInResponse = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});
			console.log(
				'🚀 ~ file: SignInForm.tsx:27 ~ handleSignUpBtn ~ signInResponse:',
				signInResponse
			);

			if (!signInResponse || signInResponse.ok !== true) {
				return window.alert('Invalid credentials');
			} 
			router.refresh();
			router.push('/');
			const { status } = useSession();
			console.log(status);
			
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (status === 'authenticated') {
			router.refresh();
			router.push('/');
		}
	}, [status]);

	const content = (
		<div className='z-[99] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col bg-white shadow-2xl py-4 px-4 rounded-lg w-11/12 max-w-md'>
			<div className='  sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='text-center text-2xl font-bold text-gray-900 my-2'>
					Sign In
				</h2>
			</div>
			<form>
				<div className='bg-white text-slate-950  flex-row items-center justify-between p-5'>
					<label className='block text-gray-700 text-sm font-bold mb-2 mt-1'>
						Email:
					</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={handleInputChange}
						id='helper-text'
						aria-describedby='helper-text-explanation'
						className='mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-stone-800 leading-tight focus:outline-none focus:shadow-outline '
						placeholder='example@email.com'
					/>
					<br />
					<label className='block text-stone-800 text-sm font-bold mb-2 mt-1'>
						Password:
					</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleInputChange}
						placeholder='******'
						className='mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-stone-800  leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>

				<div className='flex flex-row items-center justify-between py-3 '>
					<button
						type='button'
						onClick={() => handleSignUpBtn()}
						className='w-80 bg-yellow hover:bg-gray-100 text-black text-md font-bold py-2 rounded-xl mx-auto shadow'
					>
						SIGN IN
					</button>
				</div>
				<div className='flex flex-row items-center justify-between py-3 '>
					<button
						type='button'
						onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/' })}
						className='w-80 bg-yellow hover:bg-gray-100 text-black text-md font-bold py-2 rounded-xl mx-auto shadow'
					>
						GOOGLE
					</button>
				</div>
			</form>
		</div>
	);

	return content;
}
