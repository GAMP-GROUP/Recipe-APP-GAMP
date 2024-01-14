'use client';
import React from 'react';
import { UserContext } from '@/contextAPI/context';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { handleSubmit } from '../lib/signInSignUpUtils';

export default function SignInForm() {
	const router = useRouter();
	const { status } = useSession();
	const { handleInputChange, user: { email, password } } = useContext(UserContext);

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/');
		}

	}, [status]);

	return (
		<form onSubmit={ handleSubmit } className='flex flex-col gap-8'>
			<section className='bg-white text-slate-950 flex flex-col gap-8 items-center w-full'>
				<fieldset
					className='w-full'
				>
					<label className='text-gray-700 text-sm font-bold self-start'>
							Email:
					</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={handleInputChange}
						id='helper-text'
						aria-describedby='helper-text-explanation'
						className='shadow border rounded w-full py-2 px-3 text-stone-800 leading-tight focus:outline-none'
						placeholder='example@email.com'
					/>
				</fieldset>
				<fieldset
					className='w-full'
				>
					<label className='text-gray-700 text-sm font-bold self-start'>
							Password:
					</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleInputChange}
						placeholder='******'
						className='shadow border rounded w-full py-2 px-3 text-stone-800 leading-tight focus:outline-none'
					/>
				</fieldset>
			</section>
		</form>
	);
}
